import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer, Provider } from 'mobx-react';

import UserCover from '../../components/UserCover';

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
    myUser: PropTypes.object.isRequired,
    tab: PropTypes.string,
    subTab: PropTypes.string,
    store: PropTypes.object,
  }

  static defaultProps = {
    tab: null,
    subTab: null,
    store: null,
  }

  constructor(props) {
    super(props);
    this.state = { activeTab: props.subTab || props.tab };
    this.isOwner = this.isOwner.bind(this);
    this.setTab = this.setTab.bind(this);
    props.app.router.customHandler = this.setTab;
  }

  componentDidMount() {
    const { ui } = this.props;
    ui.changeTransparented(true);
  }

  componentWillUnmount() {
    this.props.app.router.customHandler = null;
    const { ui } = this.props;
    ui.changeTransparented(false);
  }

  setTab({ tab, subTab }) {
    this.setState({ activeTab: subTab || tab });
  }

  isOwner() {
    const { myUser } = this.props;
    return this.store.id === myUser.id;
  }

  render() {
    const { activeTab } = this.state;
    const { store } = this.props;
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
        <Provider store={store} isOwner={this.isOwner}>
          <React.Fragment>
            <UserCover />
            <Tabs
              prefix={`@${store.username}`}
              data={userPanes}
              active={activeTab}
            />
          </React.Fragment>
        </Provider>
      </div>
    );
  }
}


export default User;
