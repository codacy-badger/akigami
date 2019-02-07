import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FlexEntries extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }
  render() {
    const { children } = this.props;
    return (
      <div className="list-entries">
        {children}
      </div>
    );
  }
}

export default FlexEntries;
