import Server from 'socket.io';

export default (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('Socket connected');
        
        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        socket.on('counter', (msg) => {
            console.log(`counter: ${msg}`);
        });
    });
};
