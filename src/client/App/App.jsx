import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import Header from '../containers/Header';
import TopBar from '../components/TopBar';
import Modal from '../containers/Modal';

@inject('app')
@observer
class App extends Component {
    static propTypes = {
        app: PropTypes.object.isRequired,
    }
    render() {
        const { router } = this.props.app;
        return (
            <section className="main">
                {/*<Modal />*/}
                <TopBar />
                <Header />
                {router.container}
            </section>
        );
    }
}

export default App;
