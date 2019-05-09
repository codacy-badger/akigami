import { computed, observable } from 'mobx';

export default class Login {
  @observable step = 'notLogged'; // notLogged, confirm, register

  @observable email = '';

  @observable loading = false;

  constructor(app) {
    this.app = app;
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

  handleSend = async () => {
    if (!this.email) return;
    await this.app.apolloClient.mutate({
      mutation: `
        mutation {
          sendEmail(email: "${this.email}")
        }
      `,
    });
    this.step = 'confirm';
  };

  removeListener = () => {
    // socket.removeListener('sign:listen', this.handleListener);
  };

  @computed
  get isValidEmail() {
    return /.+@.+\..+/i.test(this.email);
  }
}
