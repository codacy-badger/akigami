import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Logo from '../Logo';
import LogoMini from '../LogoMini';
import { SidenavWrapper, LogoWrapper } from './Sidenav.styles';

@inject('enhanced', 'ui')
@observer
class Sidenav extends Component {
  static propTypes = {
    enhanced: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  }

  render() {
    const { enhanced, ui } = this.props;
    const isMobile = enhanced.canUseOutsideEvent;
    return (
      <SidenavWrapper>
        <LogoWrapper
          isOpenSidenav={ui.isOpenSidenav}
          isMobile={isMobile}
          href="/"
        >
          {(ui.isOpenSidenav || !isMobile) && <Logo width={160} height={43} />}
          {(!ui.isOpenSidenav && isMobile) && <LogoMini width={36} height={43} />}
        </LogoWrapper>
        sidenav
      </SidenavWrapper>
    );
  }
}

export default Sidenav;
