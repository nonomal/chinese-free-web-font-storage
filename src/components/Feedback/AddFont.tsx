import { atom, ObjectAtom } from '@cn-ui/reactive';
import { addFontRequest } from '../../api/commit';
import { Notice } from '../../Notice';
import { Dialog } from './Dialog';
import { VModel } from '../../utils/VModel';
export const AddFont = () => {
    const panelVisible = atom(false);
    const a = ObjectAtom<Parameters<typeof addFontRequest>[0]>({
        fontName: '',
        nickName: '',
        detail: '',
        url: '',
    });
    return (<>
        <button onclick={() => panelVisible(true)}>{$t("a771d162e324da353ea1191205a8b2cd")}</button>
        <Dialog
            title={$t("a771d162e324da353ea1191205a8b2cd")}
            onSubmit={() => {
                if (a.fontName() && a.nickName() && a.detail() && a.url()) {
                    panelVisible(false);
                    Notice.success('您的请求已记录, 我们将会在一周内处理');
                    addFontRequest(a()).then((res) => {
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
                    placeholder={$t("5f86f91a26cad71087045e5db9ef3ec4")}
                    {...VModel(a.fontName)}
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
                    placeholder={$t("8e17f9475579af372821f388d73689e8")}
                    {...VModel(a.detail)}
                ></textarea>
                <input
                    type="text"
                    class="text-input"
                    placeholder={$t("aafa3ee925b0497d4fa4f2548cc8751f")}
                    {...VModel(a.url)}
                ></input>
            </form>
        </Dialog>
    </>);
};
