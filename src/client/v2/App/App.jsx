import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import { observer, inject } from 'mobx-react';

import HeaderMenu from '../components/HeaderMenu';

moment.locale('ru');

@inject('app')
@observer
class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };
  render() {
    const { router, ui } = this.props.app;
    return (
      <React.Fragment>
        <HeaderMenu />
        <div
          className={cx({
            'root-content': true,
            transparency: ui.transparented,
          })}
        >
          {router.container}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
