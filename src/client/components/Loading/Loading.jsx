import React, { PureComponent } from 'react';

import Cube from './Cube.icon';

class Loading extends PureComponent {
  render() {
    return (
      <section className="loading">
        <div className="lds-css ng-scope">
          <div className="lds-spinner">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </section>
    );
  }
}

export default Loading;
