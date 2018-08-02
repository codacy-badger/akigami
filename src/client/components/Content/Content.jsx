import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Content.styled';

class Content extends PureComponent {
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

export default Content;
