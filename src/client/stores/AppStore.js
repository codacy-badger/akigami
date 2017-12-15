import Router from './Router';
import TopBar from './TopBar';
import Modal from './Modal';
import UI from './UI';
import User from './User';
import Notification from './Notification';

export default class AppStore {
    constructor() {
        this.ui = new UI();
        this.topBar = new TopBar();
        this.modal = new Modal();
        this.router = new Router(this);
        this.user = new User(this);
        this.notification = new Notification();
    }
}
