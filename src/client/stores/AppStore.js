const socket = typeof window !== 'undefined' ? require('socket.io-client').connect() : null;

export default class AppStore {
    socket = socket;
}
