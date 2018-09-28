import React, { Component } from 'react';
import { Menu, Label, Dropdown } from 'semantic-ui-react';

class UserMenu extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item
          name="home"
          active
          as="a"
        >
          Главная
        </Menu.Item>
        <Dropdown
          item
          simple
          text="Библиотека"
        >
          <Dropdown.Menu>
            <Dropdown.Item as="a">Аниме</Dropdown.Item>
            <Dropdown.Item as="a">Манга</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          name="followers"
          as="a"
        >
          Подписчики
          <Label>12</Label>
        </Menu.Item>
        <Menu.Item
          name="following"
          as="a"
        >
          Подписки
          <Label>42</Label>
        </Menu.Item>
        <Menu.Item
          name="clubs"
          as="a"
        >
          Клубы
          <Label>3</Label>
        </Menu.Item>
      </Menu>
    );
  }
}

export default UserMenu;
