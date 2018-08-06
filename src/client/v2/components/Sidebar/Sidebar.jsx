import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  DrawerHeader,
} from 'rmwc/Drawer';

import {
  ListItem,
  ListItemText,
} from 'rmwc/List';

import { Wrapper, ThemedDrawer, ThemedList, ThemedListItemGraphic } from './Sidebar.styled';

class Sidebar extends PureComponent {
  static propTypes = {
    open: PropTypes.bool,
  }
  static defaultProps = {
    open: true,
  }
  render() {
    const { open } = this.props;
    return (
      <Wrapper open={open}>
        <ThemedDrawer permanent>
          <DrawerHeader>
            DrawerHeader
          </DrawerHeader>
          <ThemedList>
            <ListItem>
              <ThemedListItemGraphic>home</ThemedListItemGraphic>
              <ListItemText>Главная</ListItemText>
            </ListItem>
            <ListItem>
              <ThemedListItemGraphic>view_module</ThemedListItemGraphic>
              <ListItemText>Обзор</ListItemText>
            </ListItem>
            {/* <ListItem>
              <ListItemText>Icecream</ListItemText>
            </ListItem> */}
          </ThemedList>
        </ThemedDrawer>
      </Wrapper>
    );
  }
}

export default Sidebar;
