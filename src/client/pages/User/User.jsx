import React, { Component } from 'react';
import debugNamespace from 'debug';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import UserHeader from '../../components/UserHeader';

const debug = debugNamespace('akigami:client:user');

@inject(s => ({
  app: s.app,
  ui: s.app.ui,
  myUser: s.app.user,
}))
@observer
class User extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    myUser: PropTypes.object.isRequired,
    tab: PropTypes.string,
    subTab: PropTypes.string,
    user: PropTypes.object,
  }

  static defaultProps = {
    tab: null,
    subTab: null,
    user: null,
  }

  constructor(props) {
    super(props);
    this.state = { activeTab: props.subTab || props.tab };
    this.isOwner = this.isOwner.bind(this);
    this.setTab = this.setTab.bind(this);
    props.app.router.customHandler = this.setTab; // eslint-disable-line no-param-reassign
  }

  componentWillUnmount() {
    // this.props.app.router.customHandler = null;
    const { ui } = this.props;
    ui.changeTransparented(false);
  }

  setTab({ tab, subTab }) {
    this.setState({ activeTab: subTab || tab || 'general' });
  }

  isOwner() {
    const { user, myUser } = this.props;
    return user.id === myUser.id;
  }

  render() {
    const { activeTab } = this.state;
    const { user } = this.props;
    debug('user', user);
    debug('activeTab', activeTab);
    return (
      <React.Fragment>
        <UserHeader user={user} />
        userpage
      </React.Fragment>
    );
  }
}


export default User;
