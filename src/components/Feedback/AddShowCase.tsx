import { atom, ObjectAtom } from '@cn-ui/reactive';
import { addShowCaseRequest } from '../../api/commit';
import { Notice } from '../../Notice';
import { Dialog } from './Dialog';
import { VModel } from '../../utils/VModel';
export const AddShowCase = () => {
    const panelVisible = atom(false);
    const a = ObjectAtom<Parameters<typeof addShowCaseRequest>[0]>({
        showCaseName: '',
        nickName: '',
        detail: '',
        url: '',
    });
    return (<>
        <button
            class="cursor-pointer rounded-lg bg-green-700 px-1 text-white"
            onclick={() => panelVisible(true)}
        >{$t("bfbcf0cd77de56c137a20fe07d10e2a0")}</button>
        <Dialog
            title={$t("7af1be9f649757ba50ca7033c6765e0e")}
            onSubmit={() => {
                if (a.showCaseName() && a.nickName() && a.detail() && a.url()) {
                    panelVisible(false);
                    Notice.success('您的请求已记录, 我们将会在一周内处理');
                    addShowCaseRequest(a()).then((res) => {
                        console.log(res);
                    });
                } else {
                    Notice.error('请填写完整信息');
                }
            }}
            visible={panelVisible}
        >
            <form action="" class="flex flex-col gap-4 p-4">
                <input
                    type="text"
                    class="text-input"
                    placeholder={$t("78c39ee9f203a7a68e8e45e869b9899b")}
                    {...VModel(a.showCaseName)}
                ></input>
                <input
                    type="text"
                    class="text-input"
                    placeholder={$t("aa6061e1fbe38e6136ce2d60885e239c")}
                    {...VModel(a.nickName)}
                ></input>
                <textarea
                    class="text-input"
                    style={{ resize: 'none' }}
                    placeholder={$t("f518ef9746f391c3e503a02f6d8f1090")}
                    {...VModel(a.detail)}
                ></textarea>
                <input
                    type="text"
                    class="text-input"
                    placeholder={$t("2783b4b7e3abadcd60a1bd4b3019c643")}
                    {...VModel(a.url)}
                ></input>
            </form>
        </Dialog>
    </>);
};
