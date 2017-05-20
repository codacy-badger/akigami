import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';


function Hello() {
    return (
        <h1>Hello World</h1>
    );
}

const renderApp = (Component) => {
    render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    );
};

renderApp(Hello);

if (module.hot) {
    module.hot.accept('./', () => renderApp(Hello));
}
