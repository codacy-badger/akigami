import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Menu, Container, Dropdown, Image, Icon } from 'semantic-ui-react';
import Logo from '../Logo';

@inject('app')
@observer
class HeaderMenu extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  }
  render() {
    const { user } = this.props.app;
    const userMenu = [
      { key: 'user', text: 'Профильм', icon: 'user' },
      { key: 'settings', text: 'Настройки', icon: 'settings' },
      { key: 'sign-out', text: 'Выход', icon: 'sign out' },
    ];
    return (
      <Menu fixed="top" inverted>
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
                trigger={(
                  <span>
                    <Image
                      avatar
                      src={user.avatar}
                    />
                    {user.displayName}
                  </span>
                )}
                options={userMenu}
                pointing="top left"
                icon={null}
              />
            ) : (
              <Menu.Item as="a" href="/signin">
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
