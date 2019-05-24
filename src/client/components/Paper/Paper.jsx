import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Paper.styles';

class Paper extends Component {
  static propTypes = {
    children: PropTypes.any,
    shadow: PropTypes.bool,
    overflow: PropTypes.string,
  }

  static defaultProps = {
    children: null,
    shadow: false,
    overflow: 'auto',
  }

  render() {
    const { children, shadow, overflow, ...props } = this.props;
    return (
      <Wrapper shadow={shadow} overflow={overflow} {...props}>
        {children}
      </Wrapper>
    );
  }
}

export default Paper;
