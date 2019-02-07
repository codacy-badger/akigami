import { action, autorun, computed, observable } from 'mobx';
import debounce from 'lodash/debounce';
import { ApolloClient } from '../../lib/modules';

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

      const res = await ApolloClient.mutate({
        mutation: `
        mutation {
          signup(username: "${this.username}", token: "${token}", gender: "${this.gender}", birthday: "${this.birthday}")
        }
        `,
      });

      // this.loading = false;
      // this.app.user.setUser(res.data.sigunp.user);
      // this.app.router.go('/');

      /* fetch('/api/signup', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response;
          }
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        })
        .then(response => response.json())
        .then(response => {
          this.loading = false;
          if (response.success) {
            this.app.user.setUser(response.user);
            this.app.router.go('/');
          } else {
            const error = new Error(response.message);
            error.response = response;
            throw error;
          }
        })
        .catch(err => {
          this.loading = false;
          this.error = err.response.message;
          console.error(err);
        }); */
    }
  };

  validateUsername = debounce(async () => {
    const res = await ApolloClient.query({
      query: `
        { validateUsername(username: "${this.username}") }
      `,
    });
    this.usernameValid = res.data.validateUsername.is_valid && !res.data.validateUsername.exists;
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
