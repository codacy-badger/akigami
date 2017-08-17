import { computed, observable, toJS } from 'mobx';
import set from 'lodash/set';

import { socket } from '../lib/modules';

const defaultAvatar = '/no-photo.jpg';
const defaultCover = '/no-cover.jpg';

class Profile {
    @observable username = null;
    @observable displayName = null;
    @observable avatar = null;
    @observable cover = null;

    @observable feed = [];

    constructor(data) {
        Object.keys(data).map((key) => {
            set(this, key, data[key]);
        });
    }

    feedListener = (post) => {
        console.log('post listener', this.feed, post);
        this.feed.unshift(post);
    }

    addFeedListener() {
        socket.on(`feed:getOnceUser-${this.id}`, this.feedListener);
    }

    removeFeedListener() {
        socket.removeListener(`feed:getOnceUser-${this.id}`, this.feedListener);
    }

    getFeed() {
        socket.emit('feed:getByUser', { id: this.id }, (result) => {
            console.log('feed:getByUser', result);
            this.feed = result;
        });
    }

    @computed get getAvatar() {
        return !this.avatar ? defaultAvatar : this.avatar;
    }

    @computed get getCover() {
        return !this.cover ? defaultCover : this.cover;
    }
}

export default Profile;
