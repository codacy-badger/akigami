import { action, observable, computed } from 'mobx';
import { socket } from '../../lib/modules';

class CommentCreator {
    @observable collapsed = false;
    @observable content = '';
    @observable reply = null;
    @observable post = null;
    @observable attachments = [];

    constructor(props) {
        this.updateProps(props);
    }

    @action
    updateProps({ app, reply = null, post = null }) {
        this.app = app;
        this.post = post;
        this.updateReply(reply);
    }

    updateReply(reply = null) {
        this.reply = reply;
        if (reply) {
            this.collapsed = true;
        } else {
            this.collapsed = false;
        }
    }

    @action
    clearData() {
        this.content = '';
        this.attachments = [];
        this.reply = null;
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
        if (!this.isExistsData) return;
        socket.emit('comment:create', {
            post: this.post,
            content: this.content,
            attachments: this.attachments,
            reply: this.reply?.id,
        });

        this.clearData();
        this.changeCollapse(false);
    }

    @computed get isExistsData() {
        return (this.content.trim()).length > 0 || this.attachments.length > 0;
    }
}

export default CommentCreator;