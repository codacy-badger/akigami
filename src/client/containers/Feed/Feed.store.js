import { computed, observable } from 'mobx';

import { socket } from '../../lib/modules';
import Post from '../../models/Post';

class Feed {
  @observable list = [];
  @observable type = 'global';
  @observable userId = 'no ID';
  @observable loading = true;

  constructor(app, { type = 'global', userId = 'no ID' }) {
    this.app = app;
    this.type = type;
    this.userId = userId;
  }

  listener = post => {
    this.list.unshift(new Post(this.app, post));
  };

  addListener() {
    socket.on(this.listenerKey, this.listener);
  }

  removeListener() {
    socket.removeListener(this.listenerKey, this.listener);
  }

  getFeed() {
    const data = {};
    if (this.type !== 'global') data.id = this.userId;
    socket.emit(this.feedKey, data, result => {
      const feed = result.map(e => new Post(this.app, e));
      this.list = feed;
      this.loading = false;
    });
  }

  @computed
  get listenerKey() {
    if (this.type !== 'global') {
      return `feed:getOnceUser-${this.userId}`;
    }
    return 'feed:getOnce';
  }

  @computed
  get feedKey() {
    if (this.type !== 'global') {
      return 'feed:getByUser';
    }
    return 'feed:get';
  }

  @computed
  get isOwner() {
    if (!this.app.user.isAuth) return false;
    return this.type === 'global' || this.userId === this.app.user.id;
  }
}

export default Feed;
