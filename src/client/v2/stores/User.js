import { computed } from 'mobx';
import set from 'lodash/set';
import gql from 'graphql-tag';
import { ApolloClient } from '../lib/modules';

import UserModel from '../models/User';

class User extends UserModel {
  constructor(app) {
    super(app);
    this.app = app;
    if (typeof window !== 'undefined') {
      ApolloClient.subscribe({
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
  }

  logout = () => {
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'same-origin',
    }).then(() => {
      this.clearUserData();
      this.app.router.go(document.location.href, false);
    });
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

export default User;
