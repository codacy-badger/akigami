import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Item, Dot, Title } from './LegendItem.styled';

class LegendItem extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    color: PropTypes.string,
  };
  static defaultProps = {
    children: null,
    color: '#ccc',
  };
  render() {
    const { children, color } = this.props;
    return (
      <Item>
        <Dot style={{ backgroundColor: color }} />
        <Title>{children}</Title>
      </Item>
    );
  }
}

export default LegendItem;
