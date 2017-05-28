import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import AppStore from './stores/AppStore';
import App from './App';

(async () => {
    const raw = document.querySelector('#preload-data');
    const app = new AppStore();
    await app.router.setContainer({
        title: raw.dataset.title,
        props: raw.text ? JSON.parse(raw.text) : null,
        layout: raw.dataset.layout,
    });
    ReactDOM.render(
        <Provider app={app}>
            <App />
        </Provider>,
        document.getElementById('root'),
    );
})();
