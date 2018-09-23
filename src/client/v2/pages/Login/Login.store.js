import { computed, observable } from 'mobx';
import { socket } from '../../../lib/modules';

export default class Login {
  @observable step = 'notLogged'; // notLogged, confirm, register
  @observable email = '';
  @observable loading = false;

  constructor(app) {
    this.app = app;
    if (typeof window !== 'undefined') {
      socket.on('sign:listen', this.handleListener);
    }
  }

  handleListener = response => {
    if (response.action === 'redirect') {
      this.app.router.go(response.data.pathname);
    } else if (response.action === 'login') {
      this.app.user.setUser(response.data.user);
      this.app.router.go('/');
      this.app.notification.create({
        title: 'Добро пожаловать!',
        message: 'Вы успешно авторизовались.',
        level: 'success',
      });
    }
  };

  handleChange = (key, value) => {
    this[key] = value;
  };

  handleSend = () => {
    this.loading = true;
    socket.emit('auth:send', this.email);
    setTimeout(() => {
      this.loading = false;
      setTimeout(() => {
        this.step = 'confirm';
      }, 100);
    }, 200);
  };

  removeListener = () => {
    socket.removeListener('sign:listen', this.handleListener);
  };

  @computed
  get isValidEmail() {
    return /.+@.+\..+/i.test(this.email);
  }
}
