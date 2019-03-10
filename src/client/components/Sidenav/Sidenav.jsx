// @jsx jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { jsx, ClassNames } from '@emotion/core';
import { withTheme } from 'emotion-theming';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Logo from '../Logo';
import LogoMini from '../LogoMini';
import Sidemenu from '../Sidemenu';
import { SidenavWrapper, LogoWrapper } from './Sidenav.styles';

@inject('enhanced', 'ui')
@withTheme
@observer
class Sidenav extends Component {
  static propTypes = {
    enhanced: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  }

  @observable isScrolled = false;

  constructor(props) {
    super(props);
    this.closeTrigger = this.closeTrigger.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  closeTrigger() {
    const { ui, enhanced } = this.props;
    if (enhanced.canUseOutsideEvent && ui.isOpenSidenav) {
      ui.closeSidenav();
    }
  }

  handleScroll(e) {
    this.isScrolled = !!e.top;
  }

  render() {
    const { enhanced, ui, theme } = this.props;
    const { isScrolled } = this;
    const isMobile = enhanced.canUseOutsideEvent;
    const isCollapsed = ui.isMiniSidenav || (isMobile && !ui.isOpenSidenav);
    const tooltipProps = {
      'data-tip': 'На главную',
      'data-place': 'right',
    };
    return (
      <SidenavWrapper isMini={ui.isMiniSidenav}>
        <LogoWrapper
          {...(isCollapsed ? tooltipProps : {})}
          isMiniSidenav={ui.isMiniSidenav}
          isOpenSidenav={ui.isOpenSidenav}
          isMobile={isMobile}
          href="/"
          onClick={this.closeTrigger}
        >
          {isCollapsed
            ? <LogoMini width={36} height={43} />
            : <Logo width={160} height={43} />}
        </LogoWrapper>
        <ClassNames>
          {({ css, cx }) => (
            <Scrollbars
              universal
              autoHide
              css={cx({
                [css`
                  flex: 1;
                  ${theme.mixins.transition('box-shadow')}
                `]: true,
                [css`
                  box-shadow: 0 -1px 0 0 ${theme.colors.border};
                `]: ui.isOpenSidenav && isScrolled,
              })}
              onScrollFrame={this.handleScroll}
            >
              <Sidemenu />
            </Scrollbars>
          )}
        </ClassNames>
      </SidenavWrapper>
    );
  }
}

export default Sidenav;
