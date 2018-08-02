import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Legend.styled';

class Legend extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
  };
  static defaultProps = {
    children: null,
  };
  render() {
    const { children } = this.props;
    return <Wrapper>{children}</Wrapper>;
  }
}

export default Legend;
