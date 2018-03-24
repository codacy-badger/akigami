/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { Provider } from 'mobx-react';
import { extractCritical } from 'emotion-server';
import { renderToStaticMarkup } from 'react-dom/server';
import pick from 'lodash/pick';

import AppStore from '../../client/stores/AppStore';
import App from '../../client/App';
import template from '../template';

export default async function ({ title, layout, props = {}, ...data } = {}) {
    try {
        if (props) {
            Object.keys(props).forEach((item) => {
                if (props[item]?.constructor.name === 'model') {
                    props[item] = props[item].toObject();
                }
            });
        }
        if (!this.req.get('x-pjax')) {
            const app = new AppStore();
            const user = pick(this.req.user, ['username', 'displayName', 'id', 'avatar']);
            app.user.setUser(user);
            await app.router.setContainer({ title, layout, props });
            const { html, ids, css } = extractCritical(renderToStaticMarkup(
                <Provider app={app}>
                    <App />
                </Provider>,
            ));
            const render = Object.assign({
                body: html,
                css: '<link rel="stylesheet" href="/assets/style.css" />',
                criticalCss: css,
                hydrateIds: JSON.stringify(ids),
                user: JSON.stringify(user || {}),
                js: '<script type="text/javascript" src="/assets/modules.chunk.js"></script><script type="text/javascript" src="/assets/app.js"></script>',
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
    } catch (e) {
        console.log(e);
    }
}
