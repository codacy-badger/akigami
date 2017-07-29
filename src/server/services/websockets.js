import connect from '../sockets/connect';

const io = require('socket.io')();

io.on('connection', connect);

export default io;
