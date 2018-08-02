import mongoose from 'mongoose';
import config from 'config';
import io from '../../services/websockets';
import redis from '../../services/redis';

const User = mongoose.model('User');

export default socket => {
  socket.on('settings:edit', async (data, callback) => {
    await socket.utils.check('user');
    // сделать валидацию
    await User.update(
      {
        id: socket.request.user.id,
      },
      data,
    );
    io.sockets.emit(`profile:${socket.request.user.id}`, data);
    callback?.();
  });
};
