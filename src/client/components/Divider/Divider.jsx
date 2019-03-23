import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DividerWrapper, DividerLine, DividerTitle } from './Divider.styles';

class Divider extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { children } = this.props;
    return (
      <DividerWrapper>
        <DividerLine />
        {children && <DividerTitle>{children}</DividerTitle>}
      </DividerWrapper>
    );
  }
}

export default Divider;
