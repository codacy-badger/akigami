import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debugNamespace from 'debug';
import merge from 'lodash/merge';
import { inject, observer } from 'mobx-react';
import {
  LayoutWrapper,
  LayoutSidenav,
  LayoutHeader,
  LayoutContent,
} from './Layout.styles';

const debug = debugNamespace('akigami:client:components:layout');
const defaultProps = {
  props: {
    sidenav: {},
    header: {},
    content: {},
  },
};

@inject('app')
@observer
class Layout extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
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

  constructor(props) {
    super(props);
    this.layout = React.createRef();
    this.sidenav = React.createRef();
    this.setContentWidth = this.setContentWidth.bind(this);
    this.state = {
      contentWidth: props.app.ui.screenWidth - 320,
    };
  }

  componentDidMount() {
    debug(this.layout, this.sidenav);
    if (typeof window !== 'undefined') {
      this.setContentWidth();
    }
  }

  setContentWidth() {
    debug(this.layout.current.offsetWidth, this.sidenav.current.offsetWidth);
    if (this.layout.current && this.sidenav.current) {
      this.setState({
        contentWidth: (
          this.layout.current.offsetWidth - this.sidenav.current.offsetWidth
        ),
      });
    }
  }

  render() {
    const { contentWidth } = this.state;
    const { Sidenav, Header, Content, props } = this.props;
    const p = merge(props, defaultProps.props);
    return (
      <LayoutWrapper ref={this.layout}>
        <LayoutSidenav ref={this.sidenav}>
          <Sidenav {...p.sidenav} />
        </LayoutSidenav>
        <LayoutContent>
          <LayoutHeader width={contentWidth}>
            <Header {...p.header} />
          </LayoutHeader>
          <Content {...p.content} />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default Layout;
