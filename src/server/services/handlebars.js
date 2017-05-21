import path from 'path';
import hbs from 'hbs';
import React from 'react';
import config from 'config';
import { Provider } from 'mobx-react';
import ReactDOMServer from 'react-dom/server';
import AppStore from '../../client/stores/AppStore';
import App from '../../client/App';


hbs.registerPartials(path.join(__dirname, '..', '..', '..', 'views/partials'));

hbs.registerAsyncHelper('app', async (cb) => {
    const stores = {
        app: new AppStore(),
    };
    cb(ReactDOMServer.renderToStaticMarkup(
        <Provider {...stores}>
            <App />
        </Provider>,
    ));
});

hbs.registerHelper('css', () => (
    config.get('enviroment') !== 'development'
    ? '<link rel="stylesheet" href="/style.css" />'
    : null
));
