import { observable, action, toJS } from 'mobx';
import set from 'lodash/set';

import { socket } from '../lib/modules';
import User from '../stores/User';

class Post {
    @observable user = null;
    @observable content = null;
    @observable likes = 0;
    @observable repost = 0;
    @observable attachments = [];

    @observable edit = false;
    @observable backup = null;

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

    changeEdit(data) {
        if (typeof data === 'boolean') {
            this.edit = data;
        }
    }

    @action
    backupData() {
        this.backup = {
            content: this.content,
            attachments: this.attachments,
        };
    }

    @action
    restoreData() {
        this.content = this.backup.content;
        this.attachments = this.backup.attachments;
    }

    clearBackup() {
        this.backup = null;
    }

    changeContent(value) {
        this.content = value;
    }

    editPost = () => {
        socket.emit('feed:edit', {
            id: this.id,
            content: this.content,
            attachments: this.attachments,
        });
        this.clearBackup();
    }
}

export default Post;
