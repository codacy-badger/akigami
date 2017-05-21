require('../styles/index.pcss');
const ReactDOM = require('react-dom');
const Provider = require('mobx-react').Provider;
const AppStore = require('./stores/AppStore');
const App = require('./App');

const stores = {
    app: new AppStore(),
};

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
