import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debugNamespace from 'debug';
import { inject, observer } from 'mobx-react';
import { FaBars, FaKey /* , FaAlignRight */ } from 'react-icons/fa';
import Button from '../Button';
import Search from '../Search';
import Spacer from '../Spacer';
import HeaderUserPanel from '../HeaderUserPanel';

import { HeaderWrapper, AutoHide, HiddenSearchBlock } from './Header.styles';

const debug = debugNamespace('akigami:client:header');

@inject('ui', 'user', 'search')
@observer
class Header extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
  }

  render() {
    const { ui, user, search } = this.props;
    debug('user', user);
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
        <HiddenSearchBlock focused={search.focused}>
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
        </HiddenSearchBlock>
      </HeaderWrapper>
    );
  }
}

export default Header;
