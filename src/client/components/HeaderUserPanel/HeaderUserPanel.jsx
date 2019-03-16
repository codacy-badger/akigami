import React, { Component } from 'react';
import {
  UserWrapper,
  UserAvatar,
  UserContent,
} from './HeaderUserPanel.styles';

class HeaderUserPanel extends Component {
  render() {
    // react-image-fallback
    return (
      <UserWrapper>
        <UserAvatar>
          img
        </UserAvatar>
        <UserContent>
          Content
        </UserContent>
      </UserWrapper>
    );
  }
}

export default HeaderUserPanel;
