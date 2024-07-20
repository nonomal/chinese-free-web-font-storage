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
                Notice.error('字数太长');
                throw new Error('字数太长');
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
                Notice.success('创建成功');
                nextPage('');
                listData.refetch();

                inputText('');
                author('');
            },
            onError(e) {
                Notice.error('创建失败');
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
    return (
        <>
            <section class="mt-12 w-96 rounded-lg border bg-white p-2 shadow-xl">
                <textarea
                    {...VModel(inputText)}
                    class=" w-full resize-none appearance-none rounded-md border-b p-2 text-xs"
                    placeholder="您可以在这里反馈问题，限制长度 100 字。如果需要持续跟进，则可以前往右上角 Github 提交 Issues"
                ></textarea>
                <input type="text" placeholder="请输入你的名称" {...VModel(author)} />
                <button onclick={() => submitData.refetch()} class="float-right">
                    提交
                </button>
            </section>
            <section class="mt-12 flex w-96 flex-col items-stretch gap-6 ">
                {listData().map((i) => {
                    return (
                        <div class="rounded-lg border bg-white p-4 shadow-xl">
                            <div class="text-gray-700">
                                {i.author}
                                <span class="px-2">说:</span>
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
                        </div>
                    );
                })}
                {nextPage() !== false && <button onclick={() => listData.refetch()}>下一页</button>}
            </section>
        </>
    );
};
