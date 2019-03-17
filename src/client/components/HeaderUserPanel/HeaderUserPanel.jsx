import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      <UserWrapper onClick={() => console.log('click')}>
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
    );
  }
}

export default HeaderUserPanel;
