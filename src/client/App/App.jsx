import React, { PureComponent } from 'react';

import Main from '../pages/Main';
import Sidebar from '../containers/Sidebar';

class App extends PureComponent {
    render() {
        return (
            <section className="main">
                <Sidebar />
                {/*<Main />*/}
            </section>
        );
    }
}

export default App;
