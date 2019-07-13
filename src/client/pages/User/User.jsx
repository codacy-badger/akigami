import React, { Component } from 'react';
import debugNamespace from 'debug';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import TabsContent from '../../components/TabsContent';
import UserHeader from '../../components/UserHeader';
import PageContent from '../../components/PageContent';
import Container from '../../components/Container';

import UserBrowse from './tabs/UserBrowse';
import UserLibrary from './tabs/UserLibrary';
import UserFollowers from './tabs/UserFollowers';
import UserFollows from './tabs/UserFollows';
import UserReviews from './tabs/UserReviews';

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
    this.state = { activeTab: props.subTab || props.tab || 'browse' };
    this.isOwner = this.isOwner.bind(this);
    this.setTab = this.setTab.bind(this);
    props.app.router.customHandler = this.setTab; // eslint-disable-line no-param-reassign
  }

  componentWillUnmount() {
    const { ui } = this.props;
    ui.changeTransparented(false);
  }

  setTab({ tab, subTab }) {
    this.setState({ activeTab: subTab || tab || 'browse' });
  }

  isOwner() {
    const { user, myUser } = this.props;
    return Number(user.id) === Number(myUser.id);
  }

  render() {
    const { activeTab } = this.state;
    const { user, myUser } = this.props;
    debug('user', user);
    debug('activeTab', activeTab);
    return (
      <React.Fragment>
        <UserHeader isOwner={this.isOwner} user={user} myUser={myUser} />
        <PageContent>
          <Container>
            <TabsContent
              active={activeTab}
              onChange={(tab) => this.setTab({ tab })}
              items={[
                {
                  key: 'browse',
                  title: 'Обзор',
                  as: 'a',
                  href: `/@${user.username}`,
                  content: <UserBrowse />,
                },
                {
                  key: 'library',
                  title: 'Библиотека',
                  as: 'a',
                  href: `/@${user.username}/library`,
                  label: 540,
                  content: <UserLibrary />,
                },
                {
                  key: 'followers',
                  title: 'Подписчики',
                  as: 'a',
                  href: `/@${user.username}/followers`,
                  label: 12,
                  content: <UserFollowers />,
                },
                {
                  key: 'follows',
                  title: 'Подписки',
                  as: 'a',
                  href: `/@${user.username}/follows`,
                  label: 30,
                  content: <UserFollows />,
                },
                {
                  key: 'reviews',
                  title: 'Рецензии',
                  as: 'a',
                  href: `/@${user.username}/reviews`,
                  content: <UserReviews />,
                },
              ]}
            />
          </Container>
        </PageContent>
      </React.Fragment>
    );
  }
}


export default User;
