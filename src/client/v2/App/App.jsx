import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import HeaderMenu from '../components/HeaderMenu';

@inject('app')
@observer
class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };
  render() {
    const { router } = this.props.app;
    return (
      <div>
        <HeaderMenu />
        <div className="root-content">
          {router.container}
        </div>
      </div>
    );
  }
}

export default App;
