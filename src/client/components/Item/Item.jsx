import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ItemWrapper, ItemTitle, ItemContent, ItemRequired } from './Item.styles';

class Item extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    required: PropTypes.bool,
  }

  static defaultProps = {
    title: null,
    children: null,
    required: false,
  }

  render() {
    const { title, required, children } = this.props;
    return (
      <ItemWrapper>
        {title && (
          <ItemTitle>
            {title}
            {required && <ItemRequired>Поле обязательно</ItemRequired>}
          </ItemTitle>
        )}
        {children && <ItemContent>{children}</ItemContent>}
      </ItemWrapper>
    );
  }
}

export default Item;
