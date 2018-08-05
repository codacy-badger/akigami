import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  DrawerHeader,
} from 'rmwc/Drawer';

import {
  ListItem,
  ListItemText,
} from 'rmwc/List';

import { Wrapper, ThemedDrawer, ThemedList } from './Sidebar.styled';

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
              <ListItemText>Cookies</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Pizza</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Icecream</ListItemText>
            </ListItem>
          </ThemedList>
        </ThemedDrawer>
      </Wrapper>
    );
  }
}

export default Sidebar;
