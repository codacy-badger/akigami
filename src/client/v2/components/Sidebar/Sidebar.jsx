import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  ListItemText,
  ListDivider,
} from 'rmwc/List';

import Tooltip from '../../../components/Tooltip';
import Logo from '../Logo';

import {
  Title,
  Wrapper,
  ThemedElevation,
  ThemedDrawer,
  ThemedListItem,
  ThemedList,
  ThemedDrawerHeader,
  ThemedListItemGraphic,
  ThemedScrollbars,
} from './Sidebar.styled';

const menu = [
  {
    key: 'home',
    title: 'Главная',
    icon: 'home',
  },
  {
    key: 'calendar',
    title: 'Календарь',
    icon: 'date_range',
  },
  {
    key: 'explore',
    title: 'Обзор',
    icon: 'view_module',
  },
  {
    key: 'news',
    title: 'Новости',
    icon: 'library_books',
  },
  {
    key: 'radio',
    title: 'Радио',
    icon: 'radio',
  },
  {
    key: 'clubs',
    title: 'Клубы',
    icon: 'group',
  },
];
class Sidebar extends PureComponent {
  static propTypes = {
    open: PropTypes.bool,
    mini: PropTypes.bool,
  }
  static defaultProps = {
    open: true,
    mini: false,
  }
  renderItem = (item) => {
    const { mini } = this.props;
    const body = (
      <ThemedListItem key={item.key} selected={item.key === 'home'}>
        <ThemedListItemGraphic>{item.icon}</ThemedListItemGraphic>
        <ListItemText>{item.title}</ListItemText>
      </ThemedListItem>
    );
    if (!mini) return body;
    return (
      <Tooltip
        key={item.key}
        id={item.key}
        overlay={item.title}
        place="right"
        effect="solid"
      >
        {body}
      </Tooltip>
    );
  }
  render() {
    let { mini } = this.props;
    const { open, collapsed } = this.props;
    if (collapsed) mini = true;
    return (
      <Wrapper
        open={open}
        collapsed={collapsed ? true : undefined}
      >
        <ThemedElevation
          z={mini ? 3 : 0}
          mini={mini ? true : undefined}
        >
          <ThemedDrawer
            permanent
            mini={mini ? true : undefined}
          >
            <ThemedDrawerHeader
              mini={mini ? true : undefined}
            >
              <Logo /> <Title>Акигами</Title>
            </ThemedDrawerHeader>
            <ThemedScrollbars autoHide universal>
              <ThemedList>
                {menu.map(this.renderItem)}
                <ListDivider />
              </ThemedList>
            </ThemedScrollbars>
          </ThemedDrawer>
        </ThemedElevation>
      </Wrapper>
    );
  }
}

export default Sidebar;
