import Router from './Router';
import TopBar from './TopBar';
import Modal from './Modal';

export default class AppStore {
    constructor() {
        this.topBar = new TopBar();
        this.modal = new Modal();
        this.router = new Router(this);
    }
}
