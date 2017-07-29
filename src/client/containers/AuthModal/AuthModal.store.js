import { action, autorun, computed, observable } from 'mobx';
import queryString from 'query-string';

import { socket } from '../../lib/modules';

const isCode = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

export default class AuthModal {
    @observable step = 'notLogged'; // notLogged, confirm, register

    @observable email = '';

    @observable authCode = '';

    @observable username = '';
    @observable gender = '';
    @observable birthday = '';

    constructor(params, modal) {
        this.app = params.app;
        this.modal = modal;
        socket.on('sign:listen', this.handleListener);
        const { token } = queryString.parse(location.search);
        if (token) {
            this.step = 'confirm';
            this.authCode = token;
            this.handleToken();
        }
    }

    @computed get isValidEmail() {
        return /.+@.+\..+/i.test(this.email);
    }
    handleChange = (key, value) => {
        this[key] = value;
        if(key === 'authCode') {
            this.handleToken();
        }
    }

    handleSend = () => {
        socket.emit('auth:send', this.email);
        this.step = 'confirm';
    }

    handleToken = () => {
        if (isCode.test(this.authCode)) {
            socket.emit('auth:verifyToken', this.authCode, this.tokenListener);
        }
    }

    removeListener = () => {
        socket.removeListener('sign:listen', this.handleListener);
    }

    handleListener = (response) => {
        if (response.action === 'redirect') {
            this.app.router.go(response.data.pathname);
            this.app.modal.close(this.modal.id);
        } else if (response.action === 'login') {
            this.app.user.setUser(response.data.user);
            this.app.router.go('/news');
            this.app.modal.close(this.modal.id);
        }
    }

    @action
    tokenListener = (data) => {
        if (data.action === 'error') {
            console.log(data.message);
        } else if (data.action === 'step') {
            if (data.data.step === 'register') {
                this.step = 'register';
                this.email = data.data.email;
            } else if (data.data.step === 'login') {
                //this.app.router.go(`/email-verification/${this.authCode}`);
                fetch(`/email-verification/${this.authCode}`, {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-pjax': 1,
                    }
                }).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        const error = new Error(response.statusText);
                        error.response = response;
                        throw error;
                    }
                }).then((response) => response.json()).then((response) => {
                    console.log(response);
                    /*if (response.success) {
                        this.appState.user.setUser(response.user);
                        this.appState.router.handleGo('/');
                    } else {
                        var error = new Error(response.message);
                        error.response = response;
                        throw error;
                    }*/
                }).catch((err) => {
                    this.errorMessage = err.response.message;
                    console.error(err);
                });
                this.app.modal.close(this.modal.id);
            }
        }
    }

    handleRegister = () => {
        const user = {
            token: this.authCode,
            username: this.username,
            gender: this.gender,
            birthday: this.birthday,
        };

        fetch('/api/signup', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        }).then((response) => response.json()).then((response) => {
            console.log(response);
            /*if (response.success) {
                this.appState.user.setUser(response.user);
                this.appState.router.handleGo('/');
            } else {
                var error = new Error(response.message);
                error.response = response;
                throw error;
            }*/
        }).catch((err) => {
            this.errorMessage = err.response.message;
            console.error(err);
        });

    }
}
