import Layout, { LayoutType } from '~/layouts/HomeLayout';
import '~/style/markdown.less';
import '~/style/markdown.table.less';
import '~/style/post.css';
export const PostLayout = (props: LayoutType) => {
    return <Layout {...props}></Layout>;
};
