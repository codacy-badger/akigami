import { observable, action } from 'mobx';
import set from 'lodash/set';

import { socket } from '../lib/modules';
import User from '../stores/User';

class Comment {
    @observable user = null;
    @observable content = null;
    @observable attachments = [];

    @observable edit = false;
    @observable backup = null;

    constructor(app, data) {
        this.app = app;
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

    editComment = () => {
        socket.emit('comment:edit', {
            id: this.id,
            content: this.content,
            attachments: this.attachments,
        }, () => {
            this.changeEdit(false);
            this.app.notification.create({
                title: 'Изменение данных',
                message: 'Комментарий успешно изменён.',
                level: 'success',
            });
        });
        this.clearBackup();
    }
}

export default Comment;
