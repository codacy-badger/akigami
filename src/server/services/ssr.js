import React from 'react';
import config from 'config';
import { Provider } from 'mobx-react';
import ReactDOMServer from 'react-dom/server';

import AppStore from '../../client/stores/AppStore';
import App from '../../client/App';
import template from '../template';

export default function (data = {}) {
    const stores = {
        app: new AppStore(),
    };

    const render = Object.assign({
        body: (
            ReactDOMServer.renderToStaticMarkup(
                <Provider {...stores}>
                    <App />
                </Provider>,
            )
        ),
        css: (
            config.get('enviroment') !== 'development'
            ? '<link rel="stylesheet" href="/assets/style.css" />'
            : ''
        ),
        js: (
            '<script type="text/javascript" src="/assets/app.js"></script>'
        ),
        title: 'Акигами',
    }, data);

    return this.send(template(render));
}
