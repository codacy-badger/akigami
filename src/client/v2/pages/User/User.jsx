import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer, Provider } from 'mobx-react';

import UserCover from '../../components/UserCover';

import UserStore from './User.store';
import UserGeneral from './parts/UserGeneral';
import UserLibrary from './parts/UserLibrary';
import Tabs from '../../components/Tabs/Tabs';

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
    user: PropTypes.object.isRequired,
    myUser: PropTypes.object.isRequired,
    tab: PropTypes.string,
    subTab: PropTypes.string,
  }
  static defaultProps = {
    tab: null,
    subTab: null,
  }
  constructor(props) {
    super(props);
    this.store = new UserStore(props.app, props.user);
    this.isOwner = this.isOwner.bind(this);
    this.handleChangeHistory = this.handleChangeHistory.bind(this);
  }
  componentDidMount() {
    this.props.ui.changeTransparented(true);
  }
  componentWillUnmount() {
    this.props.ui.changeTransparented(false);
  }
  isOwner() {
    const { myUser } = this.props;
    return this.store.id === myUser.id;
  }
  handleChangeHistory(tab, item, parent) {
    const prefix = `/@${this.store.username}`;
    let path = `${prefix}/${tab}`;
    if (tab === 'general') path = `${prefix}`;
    if (parent) path = `${prefix}/${parent.key}/${tab}`;
    window.history.pushState(null, null, path);
  }
  render() {
    const { tab, subTab } = this.props;
    let activeTab = tab;
    if (subTab) activeTab = subTab;
    const userPanes = [
      {
        key: 'general',
        title: 'Общее',
        render: () => <UserGeneral />,
      },
      {
        key: 'library',
        title: 'Библиотека',
        type: 'dropdown',
        items: [
          {
            key: 'anime',
            title: 'Аниме',
            render: () => <UserLibrary type="anime" />,
          },
          {
            key: 'manga',
            title: 'Манга',
            render: () => <UserLibrary type="manga" />,
          },
        ],
      },
      {
        key: 'followers',
        title: 'Подписчики',
        label: 12,
        render: () => <div>Подписчики</div>,
      },
      {
        key: 'following',
        title: 'Подписки',
        label: 42,
        render: () => <div>Подписки</div>,
      },
      {
        key: 'clubs',
        title: 'Клубы',
        render: () => <div>Клубы</div>,
      },
    ];
    return (
      <div className="filled">
        <Provider store={this.store} isOwner={this.isOwner}>
          <React.Fragment>
            <UserCover />
            <Tabs
              data={userPanes}
              active={activeTab}
              onChange={this.handleChangeHistory}
            />
          </React.Fragment>
        </Provider>
      </div>
    );
  }
}

export default User;
