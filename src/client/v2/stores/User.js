import { computed, action, observable } from 'mobx';
import set from 'lodash/set';
import moment from 'moment';
import gql from 'graphql-tag';
import { ApolloClient } from '../lib/modules';

const defaultAvatar = '/images/no_avatar.jpg';
const defaultCover = '/images/no-cover.jpg';

export default class User {
  @observable id = null;

  @observable username = null;

  @observable displayName = null;

  @observable status = null;

  @observable avatar = defaultAvatar;

  @observable cover = defaultCover;

  @observable name = null;

  @observable email = null;

  @observable gender = null;

  @observable website = null;

  @observable city = null;

  @observable birthday = null;

  @observable role = null;

  constructor(app) {
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

  @action
  clearUserData = () => {
    this.id = null;
    this.username = null;
    this.displayName = null;
    this.avatar = null;
    this.name = null;
    this.website = null;
    this.city = null;
    this.status = null;
    this.cover = null;
    this.email = null;
    this.gender = null;
    this.birthday = null;
    this.role = null;
  };

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

  @action
  setUserData = ({
    id = this.id,
    username = this.username,
    displayName = this.displayName,
    avatar = defaultAvatar,
    cover = defaultCover,
    name = this.name,
    email = this.email,
    status = this.status,
    website = this.website,
    gender = this.gender,
    city = this.city,
    birthday = this.birthday,
    role = this.role,
  } = {}) => {
    this.id = id;
    this.username = username;
    this.displayName = displayName;
    this.avatar = avatar;
    this.status = status;
    this.name = name;
    this.website = website;
    this.cover = cover;
    this.city = city;
    this.email = email;
    this.gender = gender;
    this.birthday = birthday;
    this.role = role;
  };

  @computed
  get isAuth() {
    return this.id != null && this.username != null && this.displayName != null;
  }

  @computed
  get getAvatar() {
    return !this.avatar ? defaultAvatar : this.avatar;
  }

  @computed
  get genderTitle() {
    switch (this.gender) {
    case 'male': return 'Мужчина';
    case 'female': return 'Женщина';
    default: return 'Не указан';
    }
  }

  @computed
  get registerDate() {
    return moment(this.createdAt).format('LL');
  }

  @computed
  get birthdayDate() {
    if (this.birthday) {
      return moment(this.birthday).format('LL');
    }
    return 'Не указан';
  }

  @computed
  get getCover() {
    return !this.cover ? defaultCover : this.cover;
  }

  @computed
  get link() {
    return `/@${this.username}`;
  }
}
