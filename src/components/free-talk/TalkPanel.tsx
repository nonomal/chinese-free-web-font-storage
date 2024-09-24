import { atom, resource } from '@cn-ui/reactive';
import { VModel } from '../../utils/VModel';
import { onMount } from 'solid-js';
import { Notice } from '../../Notice';

interface Posts {
    title: string;
    content: string;
    author: string;
    createAt?: string;
}

export const TalkPanel = () => {
    const inputText = atom('');
    const author = atom('');
    const submitData = resource(
        async () => {
            if ([...inputText()].length >= 100) {
                Notice.error($t("2fec8f64738e7a70240d2d31e4f5bacd"));
                throw new Error($t("2fec8f64738e7a70240d2d31e4f5bacd"));
            }
            return fetch('https://free-talk.deno.dev/posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channel: 'cn-fonts',
                    title: Date.now().toString() + Math.random(),
                    content: inputText(),
                    author: author(),
                }),
            });
        },
        {
            immediately: false,
            onSuccess(data) {
                Notice.success($t("04a691b377c91da599d5b4b62b0cb114"));
                nextPage('');
                listData.refetch();

                inputText('');
                author('');
            },
            onError(e) {
                Notice.error($t("a889286a51f3adab3cfb6913f2b0ac2e"));
            },
        }
    );
    let nextPage = atom<string | false>('');
    const listData = resource<Posts[]>(
        async () => {
            if (nextPage() === false) return;
            return fetch(
                'https://free-talk.deno.dev/posts/list?channel=cn-fonts&next=' + nextPage()
            )
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    nextPage(res.next);
                    return res.data;
                });
        },
        {
            immediately: false,
            initValue: [],
        }
    );
    onMount(() => listData.refetch());
    return (<>
        <section class="mt-12 w-96 rounded-lg border bg-white p-2 shadow-xl">
            <textarea
                {...VModel(inputText)}
                class=" w-full resize-none appearance-none rounded-md border-b p-2 text-xs"
                placeholder={$t("5bdb80d3d0346e2b26b744ab2f62dd58")}
            ></textarea>
            <input type="text" placeholder={$t("94928ec1ef89f7e56b739e60ebfd5451")} {...VModel(author)} />
            <button onclick={() => submitData.refetch()} class="float-right">{$t("ac04c150e7bbfd64195996bdf1df8d77")}</button>
        </section>
        <section class="mt-12 flex w-96 flex-col items-stretch gap-6 ">
            {listData().map((i) => {
                return (
                    (<div class="rounded-lg border bg-white p-4 shadow-xl">
                        <div class="text-gray-700">
                            {i.author}
                            <span class="px-2">{$t("6ebc07655250d9026cb3158cbe5dcb5a")}</span>
                        </div>
                        <p class="pt-4 text-gray-500">{i.content}</p>
                        <p class="mt-4 text-xs text-gray-500">
                            {new Date(i.createAt!).toLocaleDateString()}
                            <span class="px-2">|</span>
                            {new Date(i.createAt!).toLocaleTimeString()}
                            {/* <button
                                onclick={() => {
                                    fetch(
                                        'https://free-talk.deno.dev/posts/delete?channel=cn-fonts&id=' +
                                            i.title
                                    );
                                }}
                            >
                                删除
                            </button> */}
                        </p>
                    </div>)
                );
            })}
            {nextPage() !== false && <button onclick={() => listData.refetch()}>{$t("b4e1b508d0e29d47e5dafbf95109cfd0")}</button>}
        </section>
    </>);
};
