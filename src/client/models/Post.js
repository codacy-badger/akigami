import { observable } from 'mobx';
import set from 'lodash/set';

import User from '../stores/User';

class Post {
    @observable user = null;
    @observable content = null;
    @observable likes = 0;
    @observable repost = 0;
    @observable attachments = [];

    constructor(data) {
        Object.keys(data).forEach((key) => {
            if (key === 'user' && typeof data[key] === 'object') {
                const user = new User();
                user.setUser(data[key]);
                set(this, key, user);
            } else {
                set(this, key, data[key]);
            }
        });
    }
}

export default Post;
