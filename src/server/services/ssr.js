import React from 'react';
import { Provider } from 'mobx-react';
import ReactDOMServer from 'react-dom/server';

import AppStore from '../../client/stores/AppStore';
import App from '../../client/App';
import template from '../template';

export default async function ({ title, layout, props = {}, ...data } = {}) {
    if (!this.req.get('x-pjax')) {
        const app = new AppStore();
        await app.router.setContainer({ title, layout, props });
        const render = Object.assign({
            body: (
                ReactDOMServer.renderToStaticMarkup(
                    <Provider app={app}>
                        <App />
                    </Provider>,
                )
            ),
            css: '<link rel="stylesheet" href="/assets/style.css" />',
            js: '<script type="text/javascript" src="/assets/modules.js"></script><script type="text/javascript" src="/assets/app.js"></script>',
            preload: `<script type="application/json" id="preload-data" data-layout="${layout}" data-title="${title}">${JSON.stringify(props)}</script>`,
            title,
        }, data);

        return this.send(template(render));
    }
    return this.json({
        title,
        layout,
        props,
    });
}
