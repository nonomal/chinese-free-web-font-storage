---
title: 转接 ImageKit 服务器
description: 转接 ImageKit 服务器
article:
  authors:
    - 江夏尧
  section: 使用教程
  tags:
    - 使用指南
  pubDate: 2023-12-24T00:00:00.000Z
  image: >-
    https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif
---
# Redirecting to ImageKit Server

For various reasons, we may need to redirect the CDN of the ImageKit service provider to achieve faster and better loading speed for our website. At this time, we need to use a free function computing service to convert the data provided by ImageKit to another domain.

> If you are redirecting to a CDN, there is no problem at all; the CDN cache will only have a small amount of access to your relay server. However, if it is directly provided to your website, it is better to think twice.

## Core Logic

1. Use a free Worker service to transform the original website URL into another URL.
2. The achieved effect is that the same data can be accessed by simply changing the domain of the URL.
3. Worker is a server with a JS runtime deployed at the edge. Generally, service providers will directly provide a domain for you to deploy this server.

## Redirecting with Cloudflare (Recommended)

Although Cloudflare's speed in China is not good, it is much better overseas. Additionally, Cloudflare provides a huge amount of free Worker quota, which can be used to redirect the original site to another domain.

1. Log in or register at <https://www.cloudflare.com/>.

2. Enter the management panel and create a Worker. Keep clicking the blue button until the creation is successful.

![cloudflare\_create\_worker](../../../assets/cloudflare_create_worker.png)

3. Enter the code editing panel, directly input the following code, and then click the "Deploy" button.

![Alt text](../../../assets/cloudflare_playground_deploy.png)

```js
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const redirectUrl = 'ik.imagekit.io'
        url.host = redirectUrl;
        return fetch(url).then(res => {
            return new Response(res.body, {
                headers: {
                    server: "nginx",
                    "Access-Control-Allow-Origin": "*",
                    "Cache-Control": "public, max-age=86400"
                }
            })
        })
    }
};
```

4. This completes the creation of the worker. Generally, when deploying, you will be provided with the Worker's address, so remember to save it.

## Redirecting with deno.dev

deno.dev also provides free Worker services and can be used to redirect websites.

1. Log in with your Github account at [deno.dev](https://deno.dev).

2. Create a playground. (Note: Click the New Playground button, not Project)

3. You will enter a code editor, copy the following code into the editor (without changing any information), and save it.

   ```ts
   import { ConnInfo, serve } from 'https://deno.land/std@0.177.0/http/server.ts';

   /** Copy Headers */
   const copyHeaders = (headers: Headers) => {
       const newHeader = new Headers();
       for (let i of headers.entries()) {
           newHeader.append(...i);
       }
       return newHeader;
   };
   /** Rewrite Request Headers */
   const ReqHeadersRewrite = (req: Request, Url: URL) => {
       const newH = copyHeaders(req.headers);
       newH.delete('X-deno-transparent');
       // Rewrite referer and origin to ensure data can be obtained
       newH.set('referer', Url.toString());
       newH.set('origin', Url.toString());
       return newH;
   };
   const ResHeadersReWrite = (res: Response, domain: string) => {
       const newHeader = copyHeaders(res.headers);
       newHeader.set('access-control-allow-origin', '*');
       const cookie = newHeader.get('set-cookie');
       cookie && newHeader.set('set-cookie', cookie.replace(/domain=(.+?);/, `domain=${domain};`));
       newHeader.delete('X-Frame-Options'); // Prevents iframe nesting restrictions
       return newHeader;
   };
   /** Proxy the entire website, including all request modes */
   const proxy = (host: string, req: Request) => {
       const Url = new URL(req.url);
       Url.host = host;
       if (Url instanceof Response) return Url;

       const newH = ReqHeadersRewrite(req, Url);
       return fetch(Url, {
           headers: newH,
           method: req.method,
           body: req.body,
           redirect: req.redirect,
       }).then((res) => {
           const newHeader = ResHeadersReWrite(res, new URL(req.url).host);
           const config = {
               status: res.status,
               statusText: res.statusText,
               headers: newHeader,
           };
           if (res.status >= 300 && res.status < 400) {
               return Response.redirect(req.url, res.status);
           }
           return new Response(res.body, config);
       });
   };

   serve(
       (req: Request) => {
           return proxy('ik.imagekit.io', req);
       },
       {
           onError(e) {
               return new Response(JSON.stringify({ error: e, code: 101 }), {
                   headers: {
                       'access-control-allow-origin': '*',
                   },
               });
           },
       }
   );
   ```

4. You can see the URL in the address bar on the right side of the editor, which is the URL after the redirection.

5. The path following this address is the same as the path of the original website, except that the domain has changed to deno.dev.

