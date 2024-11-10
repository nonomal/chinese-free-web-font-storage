/**
 * 在主线程中管理字体转换 worker 的类
 */
export class RemoteConvertManager {
    pool = {
        async exec(method, params) {
            if (!params || !params[0]) throw new Error("远程发送错误");
            const [buffer] = params
            return fetch(this.getUrl(), {
                method: "post",
                body: buffer,
            })
                .then((res) => {
                    if (res.status !== 200) {
                        throw new Error("远程服务错误")
                    }
                    return res.arrayBuffer()
                })
                .then((res) => new Uint8Array(res));
        },
        getUrl() {
            return "http://0.0.0.0:8000/woff2";
        },
    };

    constructor(getUrl) {
        this.pool.getUrl = getUrl;
    }
    destroy() {
        // 终止工作池，释放所有资源。
        // this.pool.terminate();
    }
}
