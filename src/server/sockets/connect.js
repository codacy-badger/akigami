import { requireFiles } from '../utils';
import utils from '../sockets/utils';

export default socket => {
  socket.utils = utils(socket);
  requireFiles('sockets/routes', socket);
  console.log(`Socket ${socket.conn.id} connected`);

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.conn.id} disconnected`);
  });
};
