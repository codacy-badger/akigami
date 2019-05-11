import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Paper.styles';

class Paper extends Component {
  static propTypes = {
    children: PropTypes.any,
    shadow: PropTypes.bool,
  }

  static defaultProps = {
    children: null,
    shadow: false,
  }

  render() {
    const { children, shadow, ...props } = this.props;
    return (
      <Wrapper shadow={shadow} {...props}>
        {children}
      </Wrapper>
    );
  }
}

export default Paper;
