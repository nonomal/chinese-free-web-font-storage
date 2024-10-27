import Layout from '~/layouts/HomeLayout';
export default () => {
    return (
        <Layout title={'404'} description={'404'} keywords={'404'} noFollow>
            <div class="container mx-auto p-8 text-center my-12">
                <h1 class="text-9xl font-bold text-gray-600">404 Not Found</h1>
                <p class="text-3xl font-medium text-gray-800 mt-4">抱歉，您查找的页面不存在。</p>
                <p class="text-lg text-gray-600 mt-2">请检查您输入的网址是否正确，或返回首页。</p>

                <div class="mt-8">
                    <a
                        href="/zh-cn"
                        class="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                    >
                        返回首页
                    </a>
                </div>
            </div>
        </Layout>
    );
};
