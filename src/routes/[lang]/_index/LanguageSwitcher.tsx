import { Popover } from '@cn-ui/core';
import { useLocation } from '@solidjs/router';
import { useContext } from 'solid-js';
import { i18nContext, languageConfig } from '~/i18n';
export const LanguageSwitcher = () => {
    const { lang } = useContext(i18nContext) ?? {};
    const config = languageConfig.languages;
    const location = useLocation();
    return (
        <Popover
            trigger="hover"
            content={
                <nav class="outline-none flex flex-col bg-gray-50 border rounded-2xl gap-4 p-4">
                    {config.map((i) => {
                        return (
                            <a
                                classList={{
                                    selected: lang === i.lang,
                                }}
                                preload={false}
                                href={
                                    '/' +
                                    i.lang +
                                    '/' +
                                    location.pathname.split('/').slice(2).join('/')
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = e.currentTarget.href;
                                }}
                            >
                                {i.name}
                            </a>
                        );
                    })}
                </nav>
            }
        >
            <div class="flex items-center">
                {/* MdiTranslate Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-1"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="m12.87 15.07l-2.54-2.51l.03-.03A17.5 17.5 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5l3.11 3.11zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2zm-2.62 7l1.62-4.33L19.12 17z"
                    />
                </svg>
                {config.find((i) => i.lang === lang)?.name || ''}{' '}
            </div>
        </Popover>
    );
};
