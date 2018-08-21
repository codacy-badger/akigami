import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import NotificationSystem from 'react-notification-system';


import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import { Main, Content } from './App.styled';

const stateDrawer = {
  FULL: 1440,
  COLLAPSED: 1174,
  HIDDEN: 1116,
};

@inject('app')
@observer
class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };
  state = {
    openDrawer: false,
    miniDrawer: false,
    collapsedDrawer: false,
    overlayedDrawer: false,
    showDrawerTrigger: true,
  }
  componentDidMount() {
    if (this.notificationSystem) {
      this.props.app.notification.init(this.notificationSystem);
    }
    this.resizeListener();
    document.addEventListener('resize', this.resizeListener);
  }
  componentWillUnmount() {
    document.removeEventListener('resize', this.resizeListener);
  }
  resizeListener = () => {
    const width = window.innerWidth;
    this.timeout = clearTimeout();
    if (width >= stateDrawer.FULL) {
      this.setState({
        openDrawer: true,
        collapsedDrawer: false,
        overlayedDrawer: false,
      });
    } else if (width >= stateDrawer.COLLAPSED) {
      this.setState({
        openDrawer: true,
        collapsedDrawer: true,
        overlayedDrawer: false,
        showDrawerTrigger: false,
      });
    } else if (width >= stateDrawer.HIDDEN || width < stateDrawer.HIDDEN) {
      this.setState({
        openDrawer: false,
        collapsedDrawer: false,
        overlayedDrawer: true,
        showDrawerTrigger: true,
      });
    }
  }
  handleCollapse = () => {
    this.setState({ openDrawer: !this.state.openDrawer });
  }
  handleOutside = () => {
    this.setState({ openDrawer: false });
  }
  render() {
    const {
      openDrawer,
      miniDrawer,
      collapsedDrawer,
      overlayedDrawer,
      showDrawerTrigger,
    } = this.state;
    const { router } = this.props.app;
    return (
      <Main>
        <NotificationSystem
          ref={e => {
            this.notificationSystem = e;
          }}
        />
        <Sidebar
          open={openDrawer}
          mini={miniDrawer}
          collapsed={collapsedDrawer}
          onOutside={this.handleOutside}
        />
        <Content
          openDrawer={openDrawer}
          collapsedDrawer={collapsedDrawer}
          overlayedDrawer={overlayedDrawer}
        >
          <Header
            onCollapse={this.handleCollapse}
            showDrawerTrigger={showDrawerTrigger}
          />
          {router.container}
          <button onClick={() => this.setState({ collapsedDrawer: !collapsedDrawer })}>collapsed</button>
          <button onClick={() => this.setState({ miniDrawer: !miniDrawer })}>mini</button>
        </Content>
      </Main>
    );
  }
}

export default App;
