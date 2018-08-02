import mongoose from 'mongoose';
import config from 'config';
import io from '../../services/websockets';
import redis from '../../services/redis';

const User = mongoose.model('User');

const availableTypes = ['avatar', 'cover'];

export default socket => {
  socket.on('profile:image', async (data, callback) => {
    await socket.utils.check('user');
    let address = null;
    let type = null;
    if (data.action === 'update') {
      let json = await redis.hget('upload_hash', data.data.hash);
      if (!json) return false;
      json = JSON.parse(json);
      if (!availableTypes.includes(json.type)) return false;
      type = json.type;
      await User.update(
        {
          id: socket.request.user.id,
        },
        {
          [json.type]: json.url,
        },
      );
      address = config.get('cdn.address') + json.url;
    } else if (data.action === 'remove') {
      console.log(data);
      if (!availableTypes.includes(data.data.type)) return false;
      type = data.data.type;
      await User.update(
        {
          id: socket.request.user.id,
        },
        {
          [data.data.type]: null,
        },
      );
    }
    io.sockets.emit(`profile:${socket.request.user.id}`, {
      [type]: address,
    });
    if (callback) {
      callback();
    }
  });
};
