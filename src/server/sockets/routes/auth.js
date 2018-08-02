import url from 'url';
import mongoose from 'mongoose';

import { sendLogin, sendRegister } from '../../email';

const EmailToken = mongoose.model('EmailToken');
const User = mongoose.model('User');

export default socket => {
  socket.on('auth:send', async (email = '') => {
    if (/.+@.+\..+/i.test(email)) {
      const emailLC = email.toLowerCase();
      const { protocol, host } = url.parse(socket.handshake.headers.origin);
      const emailToken = await EmailToken.create({ email: emailLC });
      const formattedUrl = url.format({
        protocol,
        host,
        pathname: `email-verification/${emailToken.token}`,
      });
      const isLogin = await emailToken.isLogin();
      if (isLogin) {
        sendLogin({ email, link: formattedUrl });
      } else {
        sendRegister({ email, link: formattedUrl });
      }
      socket.join(`sign:${emailToken.listenToken}`);
    }
  });

  socket.on('validate:user', (username, callback) => {
    if (
      !/^\w+$/g.test(username) ||
      username.length < 3 ||
      username.length > 40
    ) {
      return callback({ status: 'ok', is_valid: false, exists: false });
    }
    User.findOne(
      {
        username: new RegExp(`^${username}$`, 'i'),
      },
      (err, userDoc) => {
        if (err) {
          return callback({
            status: 'error',
            message: 'error username validation',
          });
        }
        callback({
          status: 'ok',
          is_valid: true,
          exists: !!userDoc,
        });
      },
    );
  });
};
