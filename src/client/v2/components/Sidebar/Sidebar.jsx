import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import {
  ListItemText,
  ListDivider,
} from 'rmwc/List';

import Tooltip from '../Tooltip';
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
    view: PropTypes.string,
    collapsed: PropTypes.bool,
    onOutside: PropTypes.func,
  }
  static defaultProps = {
    view: null,
    open: true,
    mini: false,
    collapsed: false,
    onOutside: null,
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = () => {
    const { onOutside, view } = this.props;
    if (view !== 'mobile') return;
    onOutside(true);
  }
  renderItem = (item) => {
    let { mini } = this.props;
    const { collapsed } = this.props;
    if (collapsed) mini = true;
    const body = (
      <ThemedListItem key={item.key} selected={item.key === 'home'}>
        <ThemedListItemGraphic>{item.icon}</ThemedListItemGraphic>
        <ListItemText>{item.title}</ListItemText>
      </ThemedListItem>
    );
    if (!collapsed && !mini) return body;
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
        innerRef={this.setWrapperRef}
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

const clickOutsideConfig = {
  handleClickOutside: (instance) => (
    instance.handleClickOutside
  ),
};

export default onClickOutside(Sidebar, clickOutsideConfig);
