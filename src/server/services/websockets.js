import Server from 'socket.io';

export default (server) => {
    const io = new Server(server/*, {
        transports: ['websockets'],
        wsEngine: 'uws',
    }*/);

    io.on('connection', (socket) => {
        console.log(`Socket ${socket.conn.id} connected`);

        socket.on('disconnect', () => {
            console.log(`Socket ${socket.conn.id} disconnected`);
        });
    });
};
