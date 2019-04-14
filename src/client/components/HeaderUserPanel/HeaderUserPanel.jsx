import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown, { DropdownMenu, DropdownItem, DropdownItemLink } from '../Dropdown';
import Image from '../Image';
import {
  UserWrapper,
  UserAvatar,
  UserContent,
  UserName,
} from './HeaderUserPanel.styles';

class HeaderUserPanel extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const { user } = this.props;
    return (
      <Dropdown
        trigger={['click']}
        overlay={(
          <DropdownMenu>
            <DropdownItemLink href={`/@${user.username}`}>Мой профиль</DropdownItemLink>
            <DropdownItem>Выход</DropdownItem>
          </DropdownMenu>
        )}
      >
        {({ isActive }) => (
          <UserWrapper isActive={isActive}>
            <UserAvatar>
              <Image
                src={user.avatar}
                alt={user.displayName}
                size={32}
              />
            </UserAvatar>
            <UserContent>
              <UserName>{user.displayName}</UserName>
            </UserContent>
          </UserWrapper>
        )}
      </Dropdown>
    );
  }
}

export default HeaderUserPanel;
