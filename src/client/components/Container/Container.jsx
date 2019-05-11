import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Container.styles';

class Container extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <Wrapper {...props}>
        {children}
      </Wrapper>
    );
  }
}

export default Container;
