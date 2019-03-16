import { observable, action } from 'mobx';
import find from 'lodash/find';
import ModalModel from '../models/ModalModel';

class ModalStore {
  @observable modals = [];

  appState;

  constructor(appState) {
    this.appState = appState;
  }

  @action
  show = props => {
    const modal = ModalModel.create(props);
    this.modals.push(modal);
    return modal;
  };

  setSettings = (id, settings) => {
    const modal = find(this.modals, { id });
    if (modal) {
      modal.setSettings(settings);
    }
  };

  @action
  close = id => {
    const modal = this.modals.find(el => el.id === id);
    if (modal) {
      modal.show = false;
    }
    setTimeout(() => {
      this.modals = this.modals.filter(i => i.id !== id);
      if (this.modals.length === 0) {
        window.history.pushState(null, null, window.location.pathname);
      }
    }, 300);
  };

  hide = () => {
    this.showModal = false;
  };
}

export default ModalStore;
