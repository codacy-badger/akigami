import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

const menus = [
  {
    key: 'dashboard',
    title: 'Панель управления',
    base: true,
  },
  {
    key: 'genres',
    title: 'Жанры',
  },
  {
    key: 'users',
    title: 'Пользователи',
  },
];

class AdminMenu extends Component {
  static propTypes = {
    active: PropTypes.string.isRequired,
  }

  render() {
    const { active } = this.props;
    const prefix = '/admin';
    return (
      <Menu secondary vertical>
        {menus.map(({ key, title, base }) => (
          <Menu.Item
            as="a"
            key={key}
            name={key}
            active={active === key}
            href={`${prefix}/${!base ? key : ''}`}
          >
            {title}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default AdminMenu;
