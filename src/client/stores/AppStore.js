import { observable, action } from 'mobx';
import config from 'config';

const socket = require('socket.io-client')(`${config.get('server.host')}:${config.get('server:port')}`);

export default class AppStore {
    @observable counter = 0;
    socket = socket;
    constructor() {
        this.autoIncrement();
    }

    @action
    autoIncrement() {
        setInterval(() => {
            this.counter = this.counter + 1;
            this.socket.emit('counter', this.counter);
        }, 50);
    }
}
