export const CDNHeader = () => {
    return (
        (<header class="sticky left-0 top-0 z-20 flex w-full flex-wrap items-center gap-2 border-b border-neutral-300 bg-white px-12 py-2 text-white print:hidden">
            <a href="/cdn" class="">
                <div class="text-2xl text-black">{$t("e7091d9aaf03260ce2874438c20136ae")}</div>
            </a>
            <a href="/" class="">
                <sup class="rounded-lg bg-red-400 px-2 text-white">{$t("d48fdf306ce5b7eca8e902c19eaf2ba2")}</sup>
            </a>
            <span class="flex-1"></span>
            <nav class="flex gap-4 text-sky-700">
                <a href="/" class="hidden sm:block">{$t("ecc71eb70ab062c1993178f539644473")}</a>
                <a href="/online-split" class="hidden sm:block">{$t("dc8ab813837af0d1461d136a777c1a05")}</a>

                <a href="/article">{$t("c75625dccf148721245b46b1e3e6c79f")}</a>
                <a href="/issues" class="hidden  sm:block">{$t("4e770040c7cf35fb587b2d0b99df2a32")}</a>
                <a
                    href="https://github.com/KonghaYao/chinese-free-web-font-storage"
                    target="_blank"
                    class="more-button relative overflow-visible"
                >
                    <button>Github</button>
                </a>
            </nav>
        </header>)
    );
};
