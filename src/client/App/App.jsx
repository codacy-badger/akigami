import React, { PureComponent } from 'react';

import Header from '../containers/Header';
import Main from '../pages/Main';

class App extends PureComponent {
    render() {
        return (
            <section className="main">
                <Header />
                <Main />
            </section>
        );
    }
}

export default App;
