import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import {
  ListItemText,
  // ListDivider,
} from 'rmwc/List';

import UserInfo from '../UserInfo';
import Tooltip from '../Tooltip';
import Logo from '../Logo';

import {
  Title,
  Wrapper,
  AdditionalContent,
  ThemedElevation,
  ThemedDrawer,
  ThemedListItem,
  ThemedList,
  ThemedDrawerHeader,
  ThemedListItemGraphic,
  ThemedScrollbars,
} from './Sidebar.styled';

/**
 * Сайдбар
 *
 * @class Sidebar
 * @extends {PureComponent}
 */
class Sidebar extends PureComponent {
  static propTypes = {
    /** Открытое состояние */
    open: PropTypes.bool,
    /** Минимизированное состояние с дополнительной информацией */
    mini: PropTypes.bool,
    /** Режим отображения */
    view: PropTypes.string,
    /** Минимизированное состояние */
    collapsed: PropTypes.bool,
    /** Хэндлер отклика вне сайдбара */
    onOutside: PropTypes.func,
    /** Дополнительный контент в сайдбаре */
    content: PropTypes.any,
    /** Данные пользователя */
    user: PropTypes.object,
    /** Массив меню */
    menu: PropTypes.array,
  }
  static defaultProps = {
    view: null,
    open: true,
    mini: false,
    collapsed: false,
    onOutside: null,
    content: null,
    user: null,
    menu: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      mini: props.collapsed || props.mini || !!props.content || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mini: nextProps.collapsed || nextProps.mini || !!nextProps.content || false,
    });
  }

  /**
   * Set reference
   * @param {node} node
   * @memberof Sidebar
   */
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  /**
   * Outside handler
   *
   * @memberof Sidebar
   */
  handleClickOutside = () => {
    const { onOutside, view } = this.props;
    if (view !== 'mobile') return;
    onOutside(true);
  }

  /**
   * Item of list renderer
   * @param {object} item
   * @memberof Sidebar
   */
  renderItem = (item) => {
    if (typeof window === 'undefined') return false;
    const { mini } = this.state;
    const { collapsed } = this.props;
    let pathKey = window.location.pathname;
    if (pathKey === '/') pathKey = 'home';
    const body = (
      <ThemedListItem
        tag="a"
        key={item.key}
        href={item.link}
        selected={pathKey.includes(item.key)}
      >
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
    const { mini } = this.state;
    const { menu, open, collapsed, content, user } = this.props;
    return (
      <Wrapper
        innerRef={this.setWrapperRef}
        open={open}
        collapsed={collapsed ? 'true' : undefined}
      >
        <ThemedElevation
          z={mini ? 3 : 0}
          mini={mini ? 'true' : undefined}
        >
          <ThemedDrawer
            permanent
            mini={mini ? 'true' : undefined}
          >
            <ThemedDrawerHeader
              mini={mini ? 'true' : undefined}
            >
              <Logo /> <Title>Акигами</Title>
            </ThemedDrawerHeader>
            <ThemedScrollbars autoHide universal>
              <ThemedList>
                {menu.map(this.renderItem)}
              </ThemedList>
            </ThemedScrollbars>
            <UserInfo mini={mini} user={user} />
          </ThemedDrawer>
        </ThemedElevation>
        {content && (
          <ThemedScrollbars autoHide universal>
            <AdditionalContent>
              {content}
            </AdditionalContent>
          </ThemedScrollbars>
        )}
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
