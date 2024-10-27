import { Router, useParams } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import './app.css';
import '@jongwooo/prism-theme-github/themes/prism-github-default-auto.min.css';
import { i18nContext, watchLanguageRouter } from './i18n';

export default function App() {
    return (
        <Router
            root={(props) => {
                const i18nMessage = watchLanguageRouter();
                return (
                    <i18nContext.Provider value={i18nMessage()}>
                        <Suspense>{props.children}</Suspense>
                    </i18nContext.Provider>
                );
            }}
        >
            <FileRoutes />
        </Router>
    );
}
