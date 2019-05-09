import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown, { DropdownMenu, DropdownItem, DropdownItemLink } from '../Dropdown';
import Image from '../Image';
import UserWrapper from './HeaderUserPanel.styles';

class HeaderUserPanel extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const { user } = this.props;
    return (
      <Dropdown
        trigger={['click']}
        placement="bottomLeft"
        overlay={(
          <DropdownMenu>
            <DropdownItemLink href={`/@${user.username}`}>Мой профиль</DropdownItemLink>
            <DropdownItem>Выход</DropdownItem>
          </DropdownMenu>
        )}
      >
        {({ isActive }) => (
          <UserWrapper isActive={isActive}>
            <Image
              shape="circle"
              src={user.avatar}
              alt={user.displayName}
              size={32}
            />
          </UserWrapper>
        )}
      </Dropdown>
    );
  }
}

export default HeaderUserPanel;
