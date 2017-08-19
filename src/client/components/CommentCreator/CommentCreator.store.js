import { action, observable } from 'mobx';
import { socket } from '../../lib/modules';

class CommentCreator {
    @observable collapsed = false;
    @observable content = '';
    @observable reply = null;
    @observable attachments = [];

    constructor({ app, reply = null }) {
        this.app = app;
        this.reply = reply;
    }

    @action
    clearData() {
        this.content = '';
        this.attachments = [];
    }

    changeCollapse(data) {
        if (typeof data === 'boolean') {
            this.collapsed = data;
        }
    }

    changeContent(data) {
        this.content = data;
    }

    @action
    createComment() {
        socket.emit('comment:create', {
            content: this.content,
            attachments: this.attachments,
            reply: this.reply,
        });

        this.clearData();
        this.changeCollapse(false);
    }
}

export default CommentCreator;
