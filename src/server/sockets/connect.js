import { requireFiles } from '../utils';

export default (socket) => {
    requireFiles('sockets/routes', socket);
    console.log(`Socket ${socket.conn.id} connected`);

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.conn.id} disconnected`);
    });
};
