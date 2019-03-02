import { action, autorun, computed, observable } from 'mobx';
import debounce from 'lodash/debounce';

export default class SignUp {
  @observable username = '';

  @observable usernameValid = false;

  @observable gender = '';

  @observable birthday = '';

  @observable error = '';

  @observable loading = false;

  constructor(app) {
    this.app = app;
    autorun(this.handleUsernameValid);
  }

  handleChange = (key, value) => {
    this[key] = value;
  };

  @action
  handleRegister = async () => {
    const [, token] = /signup\/(.*)/.exec(window.location.pathname);
    if (this.usernameValid) {
      this.loading = true;
      this.error = '';

      await this.app.apolloClient.mutate({
        mutation: `
        mutation {
          signup(username: "${this.username}", token: "${token}", gender: "${this.gender}", birthday: "${this.birthday}") {
            status
            message
          }
        }
        `,
      });
    }
  };

  validateUsername = debounce(async () => {
    const res = await this.app.apolloClient.query({
      query: `
        { validateUsername(username: "${this.username}") {
          isValid
          exists
        } }
      `,
    });
    this.usernameValid = res.data.validateUsername.isValid && !res.data.validateUsername.exists;
    if (res.data.validateUsername.exists) {
      this.error = 'Такое имя пользователя уже занято.';
    }
  }, 500);

  handleUsernameValid = () => {
    if (this.username.length >= 5 && this.username.length <= 40) {
      this.validateUsername();
    } else {
      this.usernameValid = false;
      if (this.username) {
        this.error = 'Имя пользователя должно быть больше 5 символов.';
      } else {
        this.error = 'Поле обязательно для заполнения.';
      }
    }
  };
}
