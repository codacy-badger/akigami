import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { FaBars, FaAlignRight } from 'react-icons/fa';
import Button from '../Button';

import { HeaderWrapper, AutoHide } from './Header.styles';

@inject('ui')
@observer
class Header extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
  }

  render() {
    const { ui } = this.props;
    return (
      <HeaderWrapper>
        <AutoHide>
          <Button
            view="borderless"
            icon={<FaBars />}
            onClick={ui.triggerSidenav}
          />
        </AutoHide>
        <Button
          view="borderless"
          icon={<FaAlignRight />}
          onClick={ui.triggerMiniSidebar}
        />
      </HeaderWrapper>
    );
  }
}

export default Header;
