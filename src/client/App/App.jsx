import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { observer, inject } from 'mobx-react';
import NotificationSystem from 'react-notification-system';
import { Global } from '@emotion/core';
import globalStyle from '../../common/global';

import Layout from '../components/Layout';
import Sidenav from '../components/Sidenav';
import Header from '../components/Header';

import AppWrapper from './App.styles';

moment.locale('ru');

@inject('app')
@observer
class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.notificationSystem = React.createRef();
  }

  componentDidMount() {
    if (this.notificationSystem.current) {
      const { app } = this.props;
      app.notification.init(this.notificationSystem.current);
    }
  }

  render() {
    const { app: { router, ui } } = this.props;
    return (
      <AppWrapper>
        <Global styles={globalStyle} />
        <NotificationSystem
          ref={this.notificationSystem}
        />
        <Layout
          Header={Header}
          Sidenav={Sidenav}
          Content={router.container.component}
          props={{
            content: router.container.props,
          }}
        />
        <ReactTooltip effect="solid" />
      </AppWrapper>
    );
  }
}

export default App;
