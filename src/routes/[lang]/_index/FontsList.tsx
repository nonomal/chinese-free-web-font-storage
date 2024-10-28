import { FontShow } from './FontShow';
import { __CDN__ } from '~/global';
import { atom } from '@cn-ui/reactive';
import './FontList.css';
import { createAsync } from '@solidjs/router';
import { getFontList } from './getFontList';

export const route = {
    preload: () => getFontList(),
};

export default () => {
    const openFontList = atom(true);
    const list = createAsync(() => getFontList());
    return (
        <section
            id="font-list"
            class="dynamic-font max-w-7xl flex flex-col my-12 overflow-hidden m-auto gap-2 pt-16 z-0 snap-start relative"
        >
            <nav class="overflow-hidden flex-1 flex flex-col items-center p-2 px-4 2xl:px-8 my-4 relative ">
                <FontShow />
                <h2 class="px-8 pb-2 text-center">
                    <span class="text-xl md:text-4xl pb-2">
                        {$t('11035eaf9b3d2bac260f72fa3eaf3c97')}
                    </span>
                </h2>
                <div class="gradient-line w-full flex-none h-px my-8"></div>
                <nav class="overflow-x-hidden p-4 h-screen">
                    <ul class="font-list-ul grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                        {list()?.map((item) => {
                            return item.remotePath.map(({ url: remote, style, name, href }) => {
                                return (
                                    <li
                                        class="relative flex-wrap  border glass-card p-2 transition-colors"
                                        id={'fonts-' + item.name}
                                        data-id={item.id}
                                        classList={{
                                            hot: item.hot,
                                            new: item.new,
                                        }}
                                    >
                                        <A
                                            class="display-font-show-hover"
                                            href={href}
                                            data-src={__CDN__ + '/' + remote}
                                            data-style={style}
                                        >
                                            <img
                                                loading="lazy"
                                                class="h-32"
                                                height="128px"
                                                width="346px"
                                                fetchpriority="low"
                                                src={
                                                    __CDN__ +
                                                    '/' +
                                                    remote.replace('result.css', 'preview.svg')
                                                }
                                                alt={name + $t('802be3b9811992af6a28615609ebdced')}
                                            />
                                        </A>
                                        <span class="text-xm absolute bottom-2 right-2 text-gray-400">
                                            {item.name}
                                            {$t('7461df0fdc259411190cdf4fd058525c')}
                                        </span>
                                    </li>
                                );
                            });
                        })}
                    </ul>
                </nav>
            </nav>
        </section>
    );
};
