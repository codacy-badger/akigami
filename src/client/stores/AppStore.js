const socket = typeof window !== 'undefined' ? require('socket.io-client').connect() : null;

export default class AppStore {
    constructor() {
        this.socket = socket;
    }
}
