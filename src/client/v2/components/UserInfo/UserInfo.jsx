import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonIcon } from 'rmwc/Button';

import {
  ThemedListItem,
  ThemedList,
  ThemedListItemGraphic,
} from '../Sidebar/Sidebar.styled';
import Tooltip from '../Tooltip';
import { Wrapper, Flex } from './UserInfo.styled';


class UserInfo extends PureComponent {
  static propTypes = {
    mini: PropTypes.bool,
  }
  static defaultProps = {
    mini: false,
  }
  renderAuth = () => {
    const { mini } = this.props;
    return (
      <React.Fragment>
        <Flex>
          {!mini ? (
            <Button
              outlined
              style={{ width: 306, flexShrink: 0, margin: '2px 0' }}
            >
              <ButtonIcon>vpn_key</ButtonIcon>
              Вход / Регистрация
            </Button>
          ) : (
            <ThemedList
              style={{
                paddingTop: 0,
                margin: '-8px -8px -16px',
                width: 'calc(100% + 16px)',
              }}
            >
              <Tooltip
                key="login"
                id="login"
                overlay="Вход / Регистрация"
                place="right"
                effect="solid"
              >
                <ThemedListItem key="login">
                  <ThemedListItemGraphic>vpn_key</ThemedListItemGraphic>
                </ThemedListItem>
              </Tooltip>
            </ThemedList>
          )}
        </Flex>
      </React.Fragment>
    );
  }
  renderUser = () => {
    const { user, mini } = this.props;
    return (
      <React.Fragment>
        123
      </React.Fragment>
    );
  }
  render() {
    const { user } = this.props;
    return (
      <Wrapper>
        {user.isAuth ? this.renderUser() : this.renderAuth()}
      </Wrapper>
    );
  }
}

export default UserInfo;
