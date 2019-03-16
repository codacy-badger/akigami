import { computed } from 'mobx';
import set from 'lodash/set';
import gql from 'graphql-tag';

import UserModel from '../models/UserModel';

class UserStore extends UserModel {
  constructor(app) {
    super(app);
    this.app = app;
  }

  initData = async ({ username }) => {
    const response = await this.app.apolloClient.query({
      query: `{
        getByUsername(username: "${username}") {
          id
          username
          displayName
          email
          birthday
          avatar
          cover
          status
          name
          city
          online
          gender
          createdAt
          visitedAt
        }
      }`,
    });
    this.setUserData(response.data.getByUsername);
  }

  setListener = () => {
    this.app.apolloClient.subscribe({
      query: gql`
      subscription {
        changed
      }`,
      variables: {},
    }).subscribe({
      next: ({ data }) => {
        if (data.changed && data.changed.action === 'login') {
          this.app.user.setUserData(data.changed.data.user);
          this.app.router.go('/');
          if (!document.hidden) {
            this.app.notification.create({
              title: `Добро пожаловать, ${data.changed.data.user.displayName}!`,
              message: 'Вы успешно авторизовались, открытые вкладки с сайтом также авторизованы и перенаправлены.',
              level: 'success',
            });
          }
        }
      },
    });
  }

  logout = async () => {
    await this.app.apolloClient.mutate({
      mutation: `mutation {
        logout
      }`,
    });
    this.clearUserData();
    this.app.router.go(document.location.pathname, false);
  };

  listener = data => {
    Object.keys(data).forEach(key => {
      set(this, key, data[key]);
    });
  };

  @computed
  get isAuth() {
    return this.id != null && this.username != null && this.displayName != null;
  }
}

export default UserStore;
