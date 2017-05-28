import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import Header from '../containers/Header';

@inject('app')
@observer
class App extends PureComponent {
    static propTypes = {
        app: PropTypes.object.isRequired,
    }
    render() {
        const { router } = this.props.app;
        return (
            <section className="main">
                <Header />
                {router.container}
            </section>
        );
    }
}

export default App;
