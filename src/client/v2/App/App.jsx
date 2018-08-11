import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import NotificationSystem from 'react-notification-system';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import { Main, Content } from './App.styled';

@inject('app')
@observer
class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };
  state = {
    openDrawer: true,
    miniDrawer: false,
  }
  componentDidMount() {
    if (this.notificationSystem) {
      this.props.app.notification.init(this.notificationSystem);
    }
  }
  handleCollapse = () => {
    this.setState({ openDrawer: !this.state.openDrawer });
  }
  render() {
    const { openDrawer, miniDrawer } = this.state;
    const { router } = this.props.app;
    return (
      <Main>
        <NotificationSystem
          ref={e => {
            this.notificationSystem = e;
          }}
        />
        <Sidebar open={openDrawer} mini={miniDrawer} />
        <Content openDrawer={openDrawer}>
          <Header onCollapse={this.handleCollapse} />
          {router.container}
          <button onClick={() => this.setState({ miniDrawer: !miniDrawer })}>mini</button>
        </Content>
      </Main>
    );
  }
}

export default App;