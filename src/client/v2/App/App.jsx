import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import NotificationSystem from 'react-notification-system';

import HeaderMenu from '../components/HeaderMenu';

moment.locale('ru');

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
    const { router, ui } = this.props.app;
    return (
      <React.Fragment>
        <NotificationSystem
          ref={e => {
            this.notificationSystem = e;
          }}
        />
        <HeaderMenu />
        <div
          className={cx({
            'root-content': true,
            transparency: ui.transparented,
          })}
        >
          {React.createElement(router.container.Module, router.container.props)}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
