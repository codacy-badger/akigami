// @jsx jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';
import { inject, observer } from 'mobx-react';
import {
  FaThLarge,
  FaThList,
  FaUsers,
  FaStoreAlt,
  FaMusic,
  FaCalendarAlt,
} from 'react-icons/fa';
import Button from '../Button';
import { SidemenuWrapper } from './Sidemenu.styles';

@inject('enhanced', 'ui', 'user', 'router')
@observer
class Sidemenu extends Component {
  static propTypes = {
    enhanced: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.closeTrigger = this.closeTrigger.bind(this);
  }

  closeTrigger() {
    const { ui, enhanced } = this.props;
    if (enhanced.canUseOutsideEvent && ui.isOpenSidenav) {
      ui.closeSidenav();
    }
  }

  render() {
    const { ui, enhanced, user, router } = this.props;
    const isMobile = enhanced.canUseOutsideEvent;
    const isCollapsed = (ui.isMiniSidenav || (isMobile && !ui.isOpenSidenav));
    const routes = [
      {
        href: '/explore',
        icon: <FaThLarge />,
        title: 'Обзор',
        show: true,
      },
      {
        href: `/@${user.username}/library`,
        icon: <FaThList />,
        title: 'Мои списки',
        show: user.isAuth,
      },
      {
        href: '/calendar',
        icon: <FaCalendarAlt />,
        title: 'Календарь',
        show: true,
      },
      {
        href: '/clubs',
        icon: <FaStoreAlt />,
        title: 'Клубы',
        show: true,
      },
      {
        href: '/users',
        icon: <FaUsers />,
        title: 'Пользователи',
        show: true,
      },
      {
        href: '/radio',
        icon: <FaMusic />,
        title: 'Радио',
        show: true,
      },
    ].filter(e => !!e.show);
    return (
      <SidemenuWrapper isMobile={isCollapsed}>
        {routes.map((item) => {
          const isActive = router.currentURL.includes(item.href);
          return (
            <Button
              block
              as="a"
              key={item.href}
              transparent
              view="borderless"
              href={item.href}
              css={css`
                > div {
                  margin-right: 20px;
                  ${isActive && 'color: #d54343;'}
                }
              `}
              collapsed={isCollapsed}
              iconLeft={item.icon}
              active={isActive}
              onClick={this.closeTrigger}
            >
              {item.title}
            </Button>
          );
        })}
      </SidemenuWrapper>
    );
  }
}

export default Sidemenu;
