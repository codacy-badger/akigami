import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import NotificationSystem from 'react-notification-system';

import Header from '../containers/Header';
import TopBar from '../components/TopBar';
import Modal from '../containers/Modal';

@inject('app')
@observer
class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };
  componentDidMount() {
    if (this.notificationSystem) {
      this.props.app.notification.init(this.notificationSystem);
    }
  }
  render() {
    const { router } = this.props.app;
    return (
      <section className="main">
        <NotificationSystem
          ref={e => {
            this.notificationSystem = e;
          }}
        />
        <Modal />
        <TopBar />
        <Header />
        {router.container}
      </section>
    );
  }
}

export default App;
