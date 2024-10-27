import Layout from '~/layouts/HomeLayout';
import { clientOnly } from '@solidjs/start';
const CDNAnalyze = clientOnly(() => import('./_cdn/cdn'));
export default () => {
    return (
        (<Layout
            title={$t('ac265d8b2ef934c364f8dc7d5d9bf044')}
            description={$t("791d5ea2fcdbbc065195a560bc3557ae")}
            keywords={$t("b3127ec038fd9ca0b9942324c98cfea0")}
            noFollow
        >
            <CDNAnalyze />
        </Layout>)
    );
};
