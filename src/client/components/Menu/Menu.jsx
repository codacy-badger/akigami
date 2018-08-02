import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Wrapper, MenuInner, Item, Counter, Title } from './Menu.styled';

class Menu extends PureComponent {
  static propTypes = {
    items: PropTypes.array,
    selected: PropTypes.string,
    onSelect: PropTypes.func,
    sticky: PropTypes.bool,
  };
  static defaultProps = {
    items: [],
    selected: null,
    onSelect: e => console.log('unhandled control', e),
    sticky: false,
  };
  render() {
    const { items, selected, onSelect, sticky } = this.props;
    return (
      <Wrapper sticky={sticky}>
        <MenuInner>
          <Grid>
            <Row>
              <Col xs={12}>
                {items.map(item => (
                  <Item
                    key={item.tab}
                    active={selected === item.tab}
                    onClick={() => onSelect(item)}
                  >
                    <Title>{item.title}</Title>
                    {typeof item.count === 'number' && (
                      <Counter>{item.count}</Counter>
                    )}
                  </Item>
                ))}
              </Col>
            </Row>
          </Grid>
        </MenuInner>
      </Wrapper>
    );
  }
}

export default Menu;
