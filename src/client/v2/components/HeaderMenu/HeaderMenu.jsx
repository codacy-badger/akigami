import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import cx from 'classnames';
import { Menu, Container, Dropdown, Image, Icon } from 'semantic-ui-react';
import Logo from '../Logo';
import TopBar from '../TopBar';

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
    const isTop = scroll <= 130;
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
          'menu-transparent': transparent,
        })}
      >
        <TopBar />
        <Container>
          <Menu.Item header as="a" href="/">
            <Logo width={26} height={28} style={{ marginRight: '1em' }} />
            Акигами
          </Menu.Item>
          <Dropdown
            item
            simple
            trigger={(
              <span>
                <Icon name="grid layout" />
                Обзор
              </span>
            )}
          >
            <Dropdown.Menu>
              <Dropdown.Item as="a">Календарь</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="a">Аниме</Dropdown.Item>
              <Dropdown.Item as="a">Манга</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Menu position="right">
            {user.isAuth ? (
              <Dropdown
                item
                simple
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
                  <Dropdown.Item onClick={user.logout}>
                    <Icon name="sign-out" />
                    Выход
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
