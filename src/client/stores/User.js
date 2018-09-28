import { computed, action, observable } from 'mobx';
import set from 'lodash/set';
import { socket } from '../lib/modules';

const defaultAvatar = '/images/no_avatar.jpg';
const defaultCover = '/images/no_cover.jpg';

export default class User {
  @observable id = null;
  @observable username = null;
  @observable displayName = null;
  @observable status = null;
  @observable avatar = null;
  @observable cover = null;
  @observable name = null;
  @observable email = null;
  @observable gender = null;
  @observable website = null;
  @observable city = null;
  @observable birthday = null;

  constructor(app) {
    this.app = app;
  }

  setUser = ({
    id = this.id,
    username = this.username,
    displayName = this.displayName,
    avatar = defaultAvatar,
    cover = defaultCover,
    name = this.name,
    status = this.status,
    city = this.city,
    email = this.email,
    website = this.website,
    gender = this.gender,
    birthday = this.birthday,
    // link = this.link
  } = {}) => {
    this.setUserData({
      id,
      username,
      displayName,
      status,
      avatar,
      cover,
      city,
      name,
      website,
      email,
      gender,
      birthday,
    });
  };

  @action
  clearUserData = () => {
    socket.removeListener(`profile:${this.id}`, this.listener);
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
    // link = this.link
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
    if (typeof window !== 'undefined') {
      socket.on(`profile:${this.id}`, this.listener);
    }
    // this.link = link;
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
  get getCover() {
    return !this.cover ? defaultCover : this.cover;
  }

  @computed
  get link() {
    return `/@${this.username}`;
  }
}
