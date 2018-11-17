import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Inline extends Component {
  static propTypes = {
    align: PropTypes.oneOf(['top', 'center', 'bottom']),
    children: PropTypes.any.isRequired,
  }
  static defaultProps = {
    align: 'top',
  }
  render() {
    const { children, align, ...props } = this.props;
    return (
      <div
        className={cx({
          'inline-block': true,
          [`align-${align}`]: align,
        })}
        {...props}
      >
        {children}
      </div>
    );
  }
}

export default Inline;
