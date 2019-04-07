import React, { Component } from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { inject, observer } from 'mobx-react';

import Sidebody from '../Sidebody';
import EnhancedSidenav from './EnhancedSidenav';
import {
  LayoutWrapper,
  LayoutHeader,
  LayoutContent,
} from './Layout.styles';

const defaultProps = {
  props: {
    sidenav: {},
    header: {},
    content: {},
  },
};

@inject('ui')
@observer
class Layout extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    Sidenav: PropTypes.any.isRequired,
    Header: PropTypes.any.isRequired,
    Content: PropTypes.any.isRequired,
    props: PropTypes.shape({
      sidenav: PropTypes.object,
      header: PropTypes.object,
      content: PropTypes.object,
    }),
  }

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.scrollEvent = this.scrollEvent.bind(this);
  }

  componentDidMount() {
    const { ui } = this.props;
    if (_CLIENT_ && ui.transparented) {
      this.scrollEvent();
      document.addEventListener('scroll', this.scrollEvent);
    }
  }

  componentWillUnmount() {
    const { ui } = this.props;
    if (_CLIENT_ && ui.transparented) {
      document.removeEventListener('scroll', this.scrollEvent);
    }
  }

  scrollEvent() {
    const { ui } = this.props;
    const scroll = document.body.scrollTop || document.documentElement.scrollTop;
    const isTop = scroll <= 40;
    if (ui.transparented) {
      if (!ui.transparent && isTop) ui.changeTransparent(true);
      if (ui.transparent && !isTop) ui.changeTransparent(false);
    }
  }

  render() {
    const { ui, Sidenav, Header, Content, props } = this.props;
    const transparent = ui.transparented ? ui.transparent : false;
    const p = merge(props, defaultProps.props);
    return (
      <LayoutWrapper isOpenSidenav={ui.isOpenSidenav}>
        <EnhancedSidenav>
          <Sidenav {...p.sidenav} />
          {ui.isMiniSidenav && <Sidebody />}
        </EnhancedSidenav>
        <LayoutContent isTransparented={ui.transparented} isOpenSidenav={ui.isOpenSidenav}>
          <LayoutHeader isTransparent={transparent} isOpenSidenav={ui.isOpenSidenav}>
            <Header {...p.header} />
          </LayoutHeader>
          <Content {...p.content} />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default Layout;
