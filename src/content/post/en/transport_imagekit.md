---
title: "Connecting to ImageKit Server"
description: "Connecting to ImageKit Server"
article:
    authors:
        - "KonghaYao"
    section: "How to Use"
    tags:
        - "User Guide"
    pubDate: 2023-12-24
    image: "https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif"
---

# Connecting to ImageKit Server

For various reasons, we may need to route through the CDN of the ImageKit service provider for faster and improved loading speeds for our website. In this case, we can use a free function computing service to redirect the data provided by ImageKit to another domain.

> If you are routing it for CDN use, there's no issue; the CDN's cache will only minimally access your relay server. However, if it's directly provided for your website, it’s best to consider this carefully.

## Core Logic

1. Utilize a free Worker service to convert the original website URL to another URL.
2. The desired effect is that the same data can be accessed by merely changing the domain of the URL.
3. A Worker is an edge-deployed JS runtime server. Generally, service providers will directly offer a domain for you to deploy this server.

## Using Cloudflare for Routing (Recommended)

Although Cloudflare has poor speeds domestically, it performs much better internationally. Furthermore, Cloudflare provides a massive amount of free Worker quotas, which can be leveraged to convert the original site to another domain.

1. Log in or register at <https://www.cloudflare.com/>

2. Go to the management panel and create a Worker. Keep clicking the blue button until it’s successfully created.

![cloudflare_create_worker](../../../assets/cloudflare_create_worker.png)

3. Enter the code editing panel, input the following code, and then click the "Deploy" button.

![Alt text](../../../assets/cloudflare_playground_deploy.png)

```js
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const redirectUrl = 'ik.imagekit.io';
        url.host = redirectUrl;
        return fetch(url).then(res => {
            return new Response(res.body, {
                headers: {
                    server: "nginx",
                    "Access-Control-Allow-Origin": "*",
                    "Cache-Control": "public, max-age=86400"
                }
            });
        });
    }
};
```

4. The Worker creation is now complete. Generally, when deployed, the Worker’s address will be provided, so remember to save it!

## Using deno.dev for Routing

deno.dev also provides a free Worker service and can route websites.

1. Log in using your Github account at [deno.dev](https://deno.dev).

2. Create a playground. (Make sure to click the New Playground button, not Project.)

3. You will be directed to a code editor; copy the code below into the editor (without changing any information) and save.

   ```ts
   import { ConnInfo, serve } from 'https://deno.land/std@0.177.0/http/server.ts';

   /** Copy headers */
   const copyHeaders = (headers: Headers) => {
       const newHeader = new Headers();
       for (let i of headers.entries()) {
           newHeader.append(...i);
       }
       return newHeader;
   };
   /** Rewrite request headers */
   const ReqHeadersRewrite = (req: Request, Url: URL) => {
       const newH = copyHeaders(req.headers);
       newH.delete('X-deno-transparent');
       // Rewrite referer and origin to ensure data can be fetched
       newH.set('referer', Url.toString());
       newH.set('origin', Url.toString());
       return newH;
   };
   const ResHeadersReWrite = (res: Response, domain: string) => {
       const newHeader = copyHeaders(res.headers);
       newHeader.set('access-control-allow-origin', '*');
       const cookie = newHeader.get('set-cookie');
       cookie && newHeader.set('set-cookie', cookie.replace(/domain=(.+?);/, `domain=${domain};`));
       newHeader.delete('X-Frame-Options'); // Prevent unauthorized iframe nesting
       return newHeader;
   };
   /** Proxy entire website, including all request patterns */
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
           console.log(res.status, res.url);
           if (res.status >= 300 && res.status < 400) {
               console.log('Redirecting to', req.url);
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

4. You can see the URL in the address bar on the right side of the editor; this is your routed URL address.

5. The path following this address remains the same as that of the original website, simply changing the domain to deno.dev.

