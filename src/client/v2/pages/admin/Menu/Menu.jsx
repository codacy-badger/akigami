import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

class AdminMenu extends Component {
  static propTypes = {
    active: PropTypes.string.isRequired,
  }

  render() {
    const { active } = this.props;
    return (
      <Menu secondary vertical>
        <Menu.Item
          as="a"
          name="dashboard"
          active={active === 'dashboard'}
          href="/admin"
        >
          Панель управления
        </Menu.Item>
        <Menu.Item
          as="a"
          name="genres"
          active={active === 'genres'}
          href="/admin/genres"
        >
          Жанры
        </Menu.Item>
      </Menu>
    );
  }
}

export default AdminMenu;
