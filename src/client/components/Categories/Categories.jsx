import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Block from '../Block';
import { List, Item, Icon, Title } from './Categories.styled';

class Categories extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    onSelect: () => {},
  };
  render() {
    const { items, onSelect } = this.props;
    return (
      <Block padded colored shadow title="Фильтр">
        <List>
          {items.map(item => (
            <Item
              key={item.id}
              active={item.active}
              onClick={() => onSelect(item)}
            >
              {item.icon && <Icon type={item.icon} />}
              <Title>{item.title}</Title>
            </Item>
          ))}
        </List>
      </Block>
    );
  }
}

export default Categories;
