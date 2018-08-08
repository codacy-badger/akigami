import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  ListItem,
  ListItemText,
} from 'rmwc/List';

import {
  Wrapper,
  ThemedElevation,
  ThemedDrawer,
  ThemedList,
  ThemedDrawerHeader,
  ThemedListItemGraphic,
} from './Sidebar.styled';

class Sidebar extends PureComponent {
  static propTypes = {
    open: PropTypes.bool,
    mini: PropTypes.bool,
  }
  static defaultProps = {
    open: true,
    mini: false,
  }
  render() {
    const { open, mini } = this.props;
    return (
      <Wrapper open={open}>
        <ThemedElevation z={mini ? 3 : 0} mini={mini}>
          <ThemedDrawer permanent mini={mini}>
            <ThemedDrawerHeader>
              ThemedDrawerHeader
            </ThemedDrawerHeader>
            <ThemedList>
              <ListItem>
                <ThemedListItemGraphic>home</ThemedListItemGraphic>
                <ListItemText>Главная</ListItemText>
              </ListItem>
              <ListItem>
                <ThemedListItemGraphic>date_range</ThemedListItemGraphic>
                <ListItemText>Календарь</ListItemText>
              </ListItem>
              <ListItem>
                <ThemedListItemGraphic>view_module</ThemedListItemGraphic>
                <ListItemText>Обзор</ListItemText>
              </ListItem>
              <ListItem>
                <ThemedListItemGraphic>library_books</ThemedListItemGraphic>
                <ListItemText>Новости</ListItemText>
              </ListItem>
              <ListItem>
                <ThemedListItemGraphic>radio</ThemedListItemGraphic>
                <ListItemText>Радио</ListItemText>
              </ListItem>
              <ListItem>
                <ThemedListItemGraphic>group</ThemedListItemGraphic>
                <ListItemText>Клубы</ListItemText>
              </ListItem>
            </ThemedList>
          </ThemedDrawer>
        </ThemedElevation>
      </Wrapper>
    );
  }
}

export default Sidebar;
