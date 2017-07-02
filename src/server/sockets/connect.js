import auth from './routes/auth';

export default (socket) => {
    auth(socket);
    console.log(`Socket ${socket.conn.id} connected`);

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.conn.id} disconnected`);
    });
}