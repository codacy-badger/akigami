import { computed, observable } from 'mobx';

import { socket } from '../../lib/modules';
import Post from '../../models/Post';

class Feed {
    @observable list = [];
    @observable type = 'global';
    @observable userId = 'no ID';
    @observable loading = true;

    constructor(app, {
        type = 'global',
        userId = 'no ID',
    }) {
        this.app = app;
        this.type = type;
        this.userId = userId;
    }

    feedListener = (post) => {
        this.list.unshift(new Post(post));
    }

    addFeedListener() {
        socket.on(this.listenerKey, this.feedListener);
    }

    removeFeedListener() {
        socket.removeListener(this.listenerKey, this.feedListener);
    }

    getFeed() {
        const data = {};
        if (this.type !== 'global') data.id = this.userId;
        socket.emit(this.feedKey, data, (result) => {
            const feed = result.map(e => new Post(e));
            this.list = feed;
            this.loading = false;
        });
    }

    @computed get listenerKey() {
        if (this.type !== 'global') {
            return `feed:getOnceUser-${this.userId}`;
        }
        return 'feed:getOnce';
    }

    @computed get feedKey() {
        if (this.type !== 'global') {
            return 'feed:getByUser';
        }
        return 'feed:get';
    }

    @computed get isOwner() {
        if (!this.app.user.isAuth) return false;
        return this.type === 'global' || (this.userId === this.app.user.id);
    }
}

export default Feed;
