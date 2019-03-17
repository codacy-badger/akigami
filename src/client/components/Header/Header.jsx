import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { FaBars, FaKey /* , FaAlignRight */ } from 'react-icons/fa';
import Button from '../Button';
import Search from '../Search';
import Spacer from '../Spacer';
import HeaderUserPanel from '../HeaderUserPanel';

import { HeaderWrapper, AutoHide } from './Header.styles';

@inject('ui', 'user')
@observer
class Header extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  render() {
    const { ui, user } = this.props;
    return (
      <HeaderWrapper>
        <AutoHide>
          <Button
            transparent
            view="borderless"
            icon={<FaBars />}
            onClick={ui.triggerSidenav}
          />
          <Spacer />
        </AutoHide>
        {/* <Button
          transparent
          view="borderless"
          icon={<FaAlignRight />}
          onClick={ui.triggerMiniSidebar}
        /> */}
        <Search />
        <Spacer full />
        {user.isAuth
          ? <HeaderUserPanel user={user} />
          : (
            <Button
              as="a"
              href="/signin"
              transparent
              collapsible
              view="borderless"
              iconLeft={<FaKey />}
            >
              Вход
            </Button>
          )}
      </HeaderWrapper>
    );
  }
}

export default Header;
