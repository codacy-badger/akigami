import { action, autorun, computed, observable } from 'mobx';
import { socket } from '../../lib/modules';

export default class Login {
    @observable step = 'notLogged'; // notLogged, confirm, register
    @observable email = '';

    constructor(app) {
        this.app = app;
        if (typeof window !== 'undefined') {
            socket.on('sign:listen', this.handleListener);
        }
    }

    handleListener = (response) => {
        if (response.action === 'redirect') {
            this.app.router.go(response.data.pathname);
        } else if (response.action === 'login') {
            this.app.user.setUser(response.data.user);
            this.app.router.go('/');
        }
    }

    handleChange = (key, value) => {
        this[key] = value;
    }

    handleSend = () => {
        socket.emit('auth:send', this.email);
        this.step = 'confirm';
    }

    removeListener = () => {
        socket.removeListener('sign:listen', this.handleListener);
    }

    @computed get isValidEmail() {
        return /.+@.+\..+/i.test(this.email);
    }
}