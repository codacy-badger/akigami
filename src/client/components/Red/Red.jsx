import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Div from './Red.styled';

class Red extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
  };
  static defaultProps = {
    children: null,
  };
  render() {
    const { children } = this.props;
    return <Div>{children}</Div>;
  }
}

export default Red;
