import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import AppStore from '../stores/AppStore';

import Group from '../containers/Group';

const stores = {
    app: new AppStore(),
};

render(
    <Provider {...stores}>
        <Group />
    </Provider>,
    document.getElementById('root'),
);
