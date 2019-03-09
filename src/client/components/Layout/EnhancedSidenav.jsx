import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import onClickOutside from 'react-onclickoutside';
import { LayoutSidenav } from './Layout.styles';

@inject('ui')
@observer
@onClickOutside
class EnhancedSidenav extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    children: PropTypes.any,
  }

  static defaultProps = {
    children: null,
  }

  @observable memScreenWidth = 0;

  @observable canUseOutsideEvent = false;

  switchPoint = 1280;

  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.outsideDisposer = this.outsideDisposer.bind(this);
    this.isSwitchLayoutPoint = this.isSwitchLayoutPoint.bind(this);
  }

  componentDidMount() {
    const { ui } = this.props;
    if (ui.isLoaded) {
      this.outsideDisposer();
      window.addEventListener('resize', this.outsideDisposer);
    }
  }

  componentWillUnmount() {
    const { ui } = this.props;
    if (ui.isLoaded) {
      window.removeEventListener('resize', this.outsideDisposer);
    }
  }

  isSwitchLayoutPoint(nextValue) {
    return (
      (this.memScreenWidth > this.switchPoint && nextValue <= this.switchPoint)
      || (this.memScreenWidth <= this.switchPoint && nextValue > this.switchPoint)
    );
  }

  outsideDisposer() {
    const { ui } = this.props;
    if (ui.isLoaded) {
      if (this.isSwitchLayoutPoint(ui.screenWidth)) {
        this.memScreenWidth = ui.screenWidth;
      }
      this.canUseOutsideEvent = this.memScreenWidth <= this.switchPoint;
    }
  }

  handleClickOutside(e) {
    const { ui } = this.props;
    if (this.canUseOutsideEvent && ui.isOpenSidenav) {
      ui.closeSidenav();
    }
  }

  render() {
    const { ui, children } = this.props;
    return (
      <LayoutSidenav isOpen={ui.isOpenSidenav}>
        {children}
      </LayoutSidenav>
    );
  }
}

export default EnhancedSidenav;
