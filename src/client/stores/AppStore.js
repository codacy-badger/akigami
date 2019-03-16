import RouterStore from './RouterStore';
import TopBarStore from './TopBarStore';
import ModalStore from './ModalStore';
import UIStore from './UIStore';
import UserStore from './UserStore';
import NotificationStore from './NotificationStore';
import SearchStore from './SearchStore';

class AppStore {
  constructor() {
    this.ui = new UIStore();
    this.topBar = new TopBarStore();
    this.modal = new ModalStore();
    this.router = new RouterStore(this);
    this.user = new UserStore(this);
    this.search = new SearchStore();
    this.notification = new NotificationStore();
    this.apolloClient = null;
  }

  provide = () => ({
    app: this,
    ui: this.ui,
    router: this.router,
    user: this.user,
    notification: this.notification,
    apolloClient: this.apolloClient,
    search: this.search,
  })
}

export default AppStore;
