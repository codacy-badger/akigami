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
  }

  state = {
    view: 'mobile',
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
    window.addEventListener('resize', this.resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  resizeListener = () => {
    const width = window.innerWidth;
    if (width >= stateDrawer.FULL) {
      this.setState({
        openDrawer: true,
        collapsedDrawer: false,
        overlayedDrawer: false,
        showDrawerTrigger: false,
        view: 'desktop',
      });
    } else if (width >= stateDrawer.COLLAPSED) {
      this.setState({
        openDrawer: true,
        collapsedDrawer: true,
        overlayedDrawer: false,
        showDrawerTrigger: false,
        view: 'tablet',
      });
    } else if (width >= stateDrawer.HIDDEN || width < stateDrawer.HIDDEN) {
      this.setState({
        openDrawer: false,
        collapsedDrawer: false,
        overlayedDrawer: true,
        showDrawerTrigger: true,
        view: 'mobile',
      });
    }
  }

  handleCollapse = () => {
    this.setState({ openDrawer: !this.state.openDrawer }, () => {
      const cond = this.state.openDrawer && this.state.overlayedDrawer;
      document.body.style.overflow = cond ? 'hidden' : '';
    });
  }

  handleOutside = () => {
    this.setState({ openDrawer: false }, () => {
      document.body.style.overflow = '';
    });
  }

  render() {
    const {
      view,
      openDrawer,
      miniDrawer,
      collapsedDrawer,
      overlayedDrawer,
      showDrawerTrigger,
    } = this.state;
    const { user, ui, router } = this.props.app;
    return (
      <Main>
        <NotificationSystem
          ref={e => {
            this.notificationSystem = e;
          }}
        />
        <Sidebar
          view={view}
          open={openDrawer}
          mini={miniDrawer} /* Необязательно */
          collapsed={collapsedDrawer}
          onOutside={this.handleOutside}
          content={ui.sidebarContent}
          user={user}
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
          <div
            style={{
              border: '1px dotted red',
              position: 'absolute',
              bottom: 0,
              left: 0,
            }}
          >
            {user.isAuth && <button onClick={() => user.logout()}>logout</button>}
            <button onClick={() => ui.clearSidebarContent()}>clear sidebar content</button>
            <button onClick={() => ui.setSidebarContent('Additional content')}>set sidebar content</button>
            <button onClick={() => this.setState({ collapsedDrawer: !collapsedDrawer })}>collapsed</button>
            <button onClick={() => this.setState({ miniDrawer: !miniDrawer })}>mini</button>
          </div>
        </Content>
      </Main>
    );
  }
}

export default App;
