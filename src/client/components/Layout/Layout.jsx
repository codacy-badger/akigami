import React, { Component } from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { inject, observer } from 'mobx-react';
import {
  LayoutWrapper,
  LayoutSidenav,
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

@inject(s => ({ ui: s.app.ui }))
@observer
class Layout extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    Sidenav: PropTypes.func.isRequired,
    Header: PropTypes.func.isRequired,
    Content: PropTypes.func.isRequired,
    props: PropTypes.shape({
      sidenav: PropTypes.object,
      header: PropTypes.object,
      content: PropTypes.object,
    }),
  }

  static defaultProps = defaultProps;

  render() {
    const { ui, Sidenav, Header, Content, props } = this.props;
    const p = merge(props, defaultProps.props);
    return (
      <LayoutWrapper isOpenSidenav={ui.isOpenSidenav}>
        <LayoutSidenav isOpen={ui.isOpenSidenav}>
          <Sidenav {...p.sidenav} />
        </LayoutSidenav>
        <LayoutContent>
          <LayoutHeader>
            <Header {...p.header} />
          </LayoutHeader>
          <Content {...p.content} />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default Layout;
