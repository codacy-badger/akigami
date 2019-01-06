import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import cx from 'classnames';
import { Menu, Container, Dropdown, Image, Icon } from 'semantic-ui-react';
import Logo from '../Logo';
import TopBar from '../TopBar';
import DropdownElement from '../Dropdown';

@inject(s => ({
  ui: s.app.ui,
  user: s.app.user,
}))
@observer
class HeaderMenu extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.scrollEvent = this.scrollEvent.bind(this);
  }

  componentDidMount() {
    this.scrollEvent();
    document.addEventListener('scroll', this.scrollEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollEvent);
  }

  scrollEvent() {
    const { ui } = this.props;
    const scroll = document.body.scrollTop || document.documentElement.scrollTop;
    const isTop = scroll <= 40;
    if (ui.transparented) {
      if (!ui.transparent && isTop) ui.changeTransparent(true);
      if (ui.transparent && !isTop) ui.changeTransparent(false);
    }
  }

  render() {
    const { ui, user } = this.props;
    const transparent = ui.transparented ? ui.transparent : false;
    return (
      <Menu
        fixed="top"
        inverted
        className={cx({
          'menu-transparency': true,
          'menu-transparent': transparent,
        })}
      >
        <TopBar />
        <Container>
          <Menu.Item header as="a" href="/">
            <Logo width={26} height={28} />
          </Menu.Item>
          <DropdownElement
            item
            trigger={(
              <span>
                <Icon name="grid layout" />
                Обзор
              </span>
            )}
          >
            <Dropdown.Menu>
              <Dropdown.Item as="a" href="/explore/anime">Аниме</Dropdown.Item>
              <Dropdown.Item as="a" href="/explore/manga">Манга</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="a">Календарь</Dropdown.Item>
            </Dropdown.Menu>
          </DropdownElement>

          <Menu.Menu position="right">
            {user.isAuth ? (
              <DropdownElement
                item
                trigger={(
                  <span>
                    <Image
                      avatar
                      src={user.avatar}
                    />
                    {user.displayName}
                  </span>
                )}
              >
                <Dropdown.Menu>
                  <Dropdown.Item as="a" href={`/@${user.username}`}>
                    <Icon name="user" />
                    Профиль
                  </Dropdown.Item>
                  <Dropdown.Item as="a">
                    <Icon name="settings" />
                    Настройки
                  </Dropdown.Item>
                  {user.role === 'admin' && (
                    <Dropdown.Item as="a" href="/admin">
                      <Icon name="shield alternate" />
                      Админ панель
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={user.logout}>
                    <Icon name="sign-out" />
                    Выход
                  </Dropdown.Item>
                </Dropdown.Menu>
              </DropdownElement>
            ) : (
              <Menu.Item as="a" href="/signIn">
                Вход
              </Menu.Item>
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default HeaderMenu;
