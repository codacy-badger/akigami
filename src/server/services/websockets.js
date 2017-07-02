import Server from 'socket.io';
import connect from '../sockets/connect';

export default (server) => {
    const io = new Server(server);

    io.on('connection', connect);

    return io;
};
