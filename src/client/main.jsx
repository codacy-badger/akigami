import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { hydrate } from 'emotion';
import AppStore from './stores/AppStore';
import App from './App';

(async () => {
    const raw = document.querySelector('#preload-data');
    const userData = JSON.parse(document.body.dataset.user);
    const ids = JSON.parse(document.body.dataset.ids);
    const app = new AppStore();
    app.user.setUser(userData);
    await app.router.setContainer({
        title: raw.dataset.title,
        props: raw.text ? JSON.parse(raw.text) : null,
        layout: raw.dataset.layout,
    });
    hydrate(ids);
    ReactDOM.render(
        <Provider app={app}>
            <App />
        </Provider>,
        document.getElementById('root'),
    );
})();
