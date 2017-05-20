import React from 'react';
import { render } from 'react-dom';


function Hello() {
    return (
        <h1>Hello World</h1>
    );
}


render(
    <Hello />,
    document.getElementById('root'),
);
