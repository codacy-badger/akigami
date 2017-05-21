const socket = typeof window !== 'undefined' ? require('socket.io-client')({ transports: ['websocket'], upgrade: false }).connect() : null;

export default class AppStore {
    constructor() {
        this.socket = socket;
    }
}
