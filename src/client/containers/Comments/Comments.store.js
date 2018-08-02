import { observable } from 'mobx';

import { socket } from '../../lib/modules';
import Comment from '../../models/Comment';

class Comments {
  @observable list = [];
  // @observable replies = [];
  @observable loading = true;
  @observable repliedComment = null;

  commentsKey = 'comment:get';

  constructor(app, { postId = null }) {
    this.app = app;
    this.postId = postId;
  }

  changeRepliedState(reply = null) {
    this.repliedComment = reply;
  }

  listener = comment => {
    this.push(this.list, new Comment(this.app, comment));
  };

  addListener() {
    socket.on(this.listenerKey, this.listener);
  }

  removeListener() {
    socket.removeListener(this.listenerKey, this.listener);
  }

  getRepliesOnComment = id => this.replies.filter(e => e.reply === id);

  getComments() {
    socket.emit(this.commentsKey, { post: this.postId }, result => {
      this.list = this.unf(result);
      this.loading = false;
    });
  }

  get listenerKey() {
    return `comment:getOncePost-${this.postId}`;
  }

  push = (arr, item, outarr) => {
    if (item.parent == null) {
      // item.children = [];
      if (outarr) {
        outarr.push(item);
      } else {
        arr.push(item);
      }
    } else {
      const parent = arr.find(i => i.id == item.parent);
      parent.children.push(item);
    }
  };

  unf = arr => {
    const out = [];
    const newArr = arr.map(item => new Comment(this.app, item));
    newArr.forEach(item => {
      this.push(newArr, item, out);
    });
    return out;
  };
}

export default Comments;
