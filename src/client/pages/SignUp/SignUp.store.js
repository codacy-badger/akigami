import { action, autorun, computed, observable } from 'mobx';
import debounce from 'lodash/debounce';
import { socket } from '../../lib/modules';

export default class SignUp {
  @observable username = '';
  @observable usernameValid = false;
  @observable gender = '';
  @observable birthday = '';

  constructor(app) {
    this.app = app;
    autorun(this.handleUsernameValid);
  }

  handleChange = (key, value) => {
    this[key] = value;
  };

  handleRegister = () => {
    const [, token] = /signup\/(.*)/.exec(window.location.pathname);
    if (this.usernameValid) {
      const user = {
        username: this.username,
        token,
        gender: this.gender,
        birthday: this.birthday,
      };
      fetch('/api/signup', {
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
          this.errorMessage = err.response.message;
          console.error(err);
        });
    }
  };

  validateUsername = debounce(() => {
    socket.emit('validate:user', this.username, res => {
      this.usernameValid = res.is_valid === true && res.exists === false;
    });
  }, 500);
  handleUsernameValid = () => {
    if (this.username.length >= 3 && this.username.length <= 40) {
      this.validateUsername();
    } else {
      this.usernameValid = false;
    }
  };
}
