import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import AppStore from '../stores/AppStore';

import Main from '../pages/Main';

import '../../styles/index.pcss';

const stores = {
    app: new AppStore(),
};

render(
    <Provider {...stores}>
        <Main />
    </Provider>,
    document.getElementById('root'),
);
