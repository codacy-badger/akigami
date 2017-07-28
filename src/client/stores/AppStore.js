import Router from './Router';
import TopBar from './TopBar';
import Modal from './Modal';
import UI from './UI';

export default class AppStore {
    constructor() {
        this.ui = new UI();
        this.topBar = new TopBar();
        this.modal = new Modal();
        this.router = new Router(this);
    }
}
