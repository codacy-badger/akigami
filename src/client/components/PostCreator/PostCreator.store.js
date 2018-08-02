import { computed, toJS, observable, action } from 'mobx';
import { socket } from '../../lib/modules';

class PostCreator {
  @observable collapsed = false;
  @observable content = '';
  @observable attachments = [];
  @observable namespace = 'global';

  constructor(app) {
    this.app = app;
    this.initStorageKeys();
  }

  initStorageKeys() {
    const { user } = this.app;
    this.storageKey = `${user.username}_post`;
    this.contentStorageKey = `${this.storageKey}-content`;
    this.attachmentsStorageKey = `${this.storageKey}-attachments`;
    this.namespaceStorageKey = `${this.storageKey}-namespace`;
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
    if (typeof window === 'undefined') return;
    const content = window.localStorage.getItem(this.contentStorageKey);
    const attachments = window.localStorage.getItem(this.attachmentsStorageKey);
    const namespace = window.localStorage.getItem(this.namespaceStorageKey);
    if (attachments) this.attachments = JSON.parse(attachments);
    if (namespace) this.namespace = namespace;
    if (content) this.content = content;
  }

  @action
  saveToStorage() {
    if (typeof window === 'undefined') return;
    const attachments = JSON.stringify(toJS(this.attachments));
    window.localStorage.setItem(this.contentStorageKey, this.content);
    window.localStorage.setItem(this.attachmentsStorageKey, attachments);
    window.localStorage.setItem(this.namespaceStorageKey, this.namespace);
  }

  clearStorage() {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(this.contentStorageKey);
    window.localStorage.removeItem(this.attachmentsStorageKey);
    window.localStorage.removeItem(this.namespaceStorageKey);
  }

  @action
  clearData() {
    this.content = '';
    this.attachments = [];
    this.namespace = 'global';
  }

  changeCollapse(data) {
    if (typeof data === 'boolean') {
      this.collapsed = data;
    }
  }

  @action
  changeContent(data) {
    this.content = data;
    this.saveToStorage();
  }

  @action
  createPost() {
    if (!this.isExistsData) return;
    socket.emit(
      'feed:create',
      {
        content: this.content,
        attachments: this.attachments,
        namespace: this.namespace,
      },
      () => {
        this.app.notification.create({
          title: 'Создание данных',
          message: 'Пост успешно создан.',
          level: 'success',
        });
      },
    );

    this.clearStorage();
    this.clearData();
    this.changeCollapse(false);
  }

  @computed
  get isExistsData() {
    return this.content.trim().length > 0 || this.attachments.length > 0;
  }
}

export default PostCreator;
