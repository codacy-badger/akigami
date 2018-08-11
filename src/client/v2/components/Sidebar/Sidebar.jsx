import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';

import {
  ListItem,
  ListItemText,
} from 'rmwc/List';

import Logo from '../Logo';

import {
  Title,
  Wrapper,
  ThemedElevation,
  ThemedDrawer,
  ThemedList,
  ThemedDrawerHeader,
  ThemedListItemGraphic,
  ThemedScrollbars,
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
  renderItem = (title, body) => {
    const { mini } = this.props;
    if (!mini) return body;
    return (
      <Tooltip
        title={title}
        position="right"
      >
        {body}
      </Tooltip>
    );
  }
  render() {
    const { open, mini } = this.props;
    return (
      <Wrapper open={open}>
        <ThemedElevation z={mini ? 3 : 0} mini={mini}>
          <ThemedDrawer permanent mini={mini}>
            <ThemedDrawerHeader mini={mini}>
              <Logo /> <Title>Акигами</Title>
            </ThemedDrawerHeader>
            <ThemedScrollbars autoHide universal>
              <ThemedList>
                {this.renderItem(
                  'Главная',
                  (
                    <ListItem>
                      <ThemedListItemGraphic>home</ThemedListItemGraphic>
                      <ListItemText>Главная</ListItemText>
                    </ListItem>
                  ),
                )}
                {this.renderItem(
                  'Календарь',
                  (
                    <ListItem>
                      <ThemedListItemGraphic>date_range</ThemedListItemGraphic>
                      <ListItemText>Календарь</ListItemText>
                    </ListItem>
                  ),
                )}
                {this.renderItem(
                  'Обзор',
                  (
                    <ListItem>
                      <ThemedListItemGraphic>view_module</ThemedListItemGraphic>
                      <ListItemText>Обзор</ListItemText>
                    </ListItem>
                  ),
                )}
                {this.renderItem(
                  'Новости',
                  (
                    <ListItem>
                      <ThemedListItemGraphic>library_books</ThemedListItemGraphic>
                      <ListItemText>Новости</ListItemText>
                    </ListItem>
                  ),
                )}
                {this.renderItem(
                  'Радио',
                  (
                    <ListItem>
                      <ThemedListItemGraphic>radio</ThemedListItemGraphic>
                      <ListItemText>Радио</ListItemText>
                    </ListItem>
                  ),
                )}
                {this.renderItem(
                  'Клубы',
                  (
                    <ListItem>
                      <ThemedListItemGraphic>group</ThemedListItemGraphic>
                      <ListItemText>Клубы</ListItemText>
                    </ListItem>
                  ),
                )}
              </ThemedList>
            </ThemedScrollbars>
          </ThemedDrawer>
        </ThemedElevation>
      </Wrapper>
    );
  }
}

export default Sidebar;
