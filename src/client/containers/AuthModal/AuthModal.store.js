import { autorun, computed, observable } from 'mobx';
import { socket } from '../../lib/modules';

const isCode = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

export default class AuthModal {
    @observable step = 'notLogged'; // notLogged, confirm, register

    @observable email = '';

    @observable authCode = '';

    @observable username = '';
    @observable gender = '';
    @observable birthday = '';

    constructor(params) {
        console.log(params)
        autorun(() => {
            if (isCode.test(this.authCode)) {
                console.log('check');
            }
        });
    }

    @computed get isValidEmail() {
        return /.+@.+\..+/i.test(this.email);
    }
    handleChange = (key, value) => {
        this[key] = value;
    }

    handleSend = () => {
        socket.emit('auth:send', this.email);
        this.step = 'confirm';
    }
}
