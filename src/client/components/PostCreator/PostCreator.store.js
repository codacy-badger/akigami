import { computed, toJS, observable, action } from 'mobx';

class PostCreator {
    @observable collapsed = false;
    @observable content = '';
    @observable attachments = [];

    constructor(app) {
        this.app = app;
        this.initStorageKeys();
    }

    initStorageKeys() {
        const { user } = this.app;
        this.storageKey = `${user.username}_post`;
        this.contentStorageKey = `${this.storageKey}-content`;
        this.attachmentsStorageKey = `${this.storageKey}-attachments`;
    }

    @action
    initStorageState() {
        this.getFromStorage();
        if (this.isExistsData) {
            this.changeCollapse(true);
        }
    }

    @action
    getFromStorage() {
        const content = localStorage.getItem(this.contentStorageKey);
        const attachments = localStorage.getItem(this.attachmentsStorageKey);
        if (attachments) this.attachments = JSON.parse(attachments);
        if (content) this.content = content;
    }

    @action
    saveToStorage() {
        const attachments = JSON.stringify(toJS(this.attachments));
        localStorage.setItem(this.contentStorageKey, this.content);
        localStorage.setItem(this.attachmentsStorageKey, attachments);
    }

    clearStorage() {
        localStorage.removeItem(this.contentStorageKey);
        localStorage.removeItem(this.attachmentsStorageKey);
    }

    @action
    clearData() {
        this.content = '';
        this.attachments = [];
    }

    changeCollapse(data) {
        this.collapsed = data;
    }

    @action
    changeContent(data) {
        this.content = data;
        this.saveToStorage();
    }

    createPost() {
        alert('func. create');
        this.clearStorage();
        this.clearData();
    }

    @computed get isExistsData() {
        return this.content.length > 0 || this.attachments.length > 0;
    }
}

export default PostCreator;
