import Server from 'socket.io';

export default (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log(`Socket ${socket.conn.id} connected`);

        socket.on('disconnect', () => {
            console.log(`Socket ${socket.conn.id} disconnected`);
        });

        socket.on('counter', (msg) => {
            console.log(`counter: ${msg}`);
        });
    });
};
