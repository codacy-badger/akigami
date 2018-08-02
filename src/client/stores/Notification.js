import { observable, computed } from 'mobx';

class Notification {
  @observable notify = undefined;
  defaultParams = {
    level: 'info',
    title: 'Подсказка',
    message: 'Обрати на меня внимание, сэмпай!',
  };

  init(reference = undefined) {
    if (reference) {
      this.notify = reference;
    }
  }

  create(params = {}) {
    if (!this.isInitialize) return;
    this.notify.addNotification({
      ...this.defaultParams,
      ...params,
    });
  }

  remove(params = null) {
    if (!this.isInitialize) return;
    const data = this.getIdentify(params);
    this.notify.removeNotification(data);
  }

  edit(params = null) {
    if (!this.isInitialize) return;
    const data = this.getIdentify(params);
    this.notify.editNotification(data);
  }

  clearAll() {
    if (!this.isInitialize) return;
    this.notify.clearNotifications();
  }

  getIdentify(data) {
    if (typeof data === 'object') {
      return { ...this.defaultParams, ...data };
    }
    return data;
  }

  @computed
  get isInitialize() {
    return typeof this.notify !== 'undefined';
  }
}

export default Notification;
