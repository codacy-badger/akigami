import Router from './Router';
import TopBar from './TopBar';

const socket = typeof window !== 'undefined' ? require('socket.io-client')({ transports: ['websocket'], upgrade: false }).connect() : null;

export default class AppStore {
    constructor() {
        this.socket = socket;
        this.topBar = new TopBar();
        this.router = new Router(this);
    }
}
