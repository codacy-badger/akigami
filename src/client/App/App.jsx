import React from 'react';
import { render } from 'react-dom';


function Hello() {
    return (
        <h1>Hello World</h1>
    );
}

const renderApp = (Component) => {
    render(
        <Component />,
        document.getElementById('root'),
    );
};

renderApp(Hello);

if (module.hot) {
    module.hot.accept('./', () => renderApp(Hello));
}
