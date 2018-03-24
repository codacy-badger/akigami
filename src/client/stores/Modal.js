import { observable, action } from 'mobx';
import find from 'lodash/find';
import ModalModel from '../models/Modal';

export default class Modal {
    @observable modals = [];
    appState;
    constructor(appState) {
        this.appState = appState;
    }
    @action
    show = (props) => {
        const modal = ModalModel.create(props);
        this.modals.push(modal);
        return modal;
    }
    setSettings = (id, settings) => {
        const modal = find(this.modals, { id });
        if (modal) {
            modal.setSettings(settings);
        }
    }

    @action
    close = (id) => {
        const modal = this.modals.find(el => el.id === id);
        if (modal) {
            modal.show = false;
        }
        setTimeout(() => {
            this.modals = this.modals.filter(i => i.id !== id);
            if (this.modals.length === 0) {
                history.pushState(null, null, location.pathname);
            }
        }, 300);
    }
    hide = () => {
        this.showModal = false;
    }
}
