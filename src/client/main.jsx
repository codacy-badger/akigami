import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import AppStore from './stores/AppStore';
import App from './App';

const stores = {
    app: new AppStore(),
};

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
