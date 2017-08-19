import { observable } from 'mobx';

import { socket } from '../../lib/modules';
import Comment from '../../models/Comment';

class Comments {
    @observable list = [];
    @observable replies = [];
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

    listener = (comment) => {
        if (comment.reply) {
            this.replies.push(new Comment(comment));
        } else {
            this.list.push(new Comment(comment));
        }
    }

    addListener() {
        socket.on(this.listenerKey, this.listener);
    }

    removeListener() {
        socket.removeListener(this.listenerKey, this.listener);
    }

    getRepliesOnComment = id => (
        this.replies.filter(e => e.reply === id)
    )

    getComments() {
        socket.emit(this.commentsKey, { post: this.postId }, (result) => {
            const replies = result.filter(e => !!e.reply);
            const inits = result.filter(e => !e.reply);

            this.list = inits.map(e => new Comment(e));
            this.replies = replies.map(e => new Comment(e));
            this.loading = false;
        });
    }

    get listenerKey() {
        return `comment:getOncePost-${this.postId}`;
    }
}

export default Comments;
