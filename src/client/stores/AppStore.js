import Router from './RouterStore';
import TopBar from './TopBarStore';
import Modal from './ModalStore';
import UI from './UIStore';
import User from './UserStore';
import Notification from './NotificationStore';

class AppStore {
  constructor() {
    this.ui = new UI();
    this.topBar = new TopBar();
    this.modal = new Modal();
    this.router = new Router(this);
    this.user = new User(this);
    this.notification = new Notification();
    this.apolloClient = null;
  }

  provide = () => ({
    app: this,
    ui: this.ui,
    router: this.router,
    user: this.user,
    notification: this.notification,
    apolloClient: this.apolloClient,
  })
}

export default AppStore;
