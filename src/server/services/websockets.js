import passport from 'passport';
import cookie from 'cookie';
import cookieParser from 'cookie-parser';
import config from 'config';

import connect from '../sockets/connect';
import store from '../config/store';

const redisStore = Promise.promisifyAll(store);
const initializeAsync = Promise.promisify(passport.initialize());
const sessionAsync = Promise.promisify(passport.session());

const io = require('socket.io')();

io.use(async (socket, next) => {
  try {
    const session = await redisStore.getAsync(cookieParser.signedCookie(
      cookie.parse(socket.request.headers.cookie).sid,
      config.get('sessionSecret'),
    ));
    socket.request.session = session;
    await initializeAsync(socket.request, {});
    await sessionAsync(socket.request, {});
    next(null, (socket.request.user && true) || false);
  } catch (e) {
    console.log(e);
  }
});

io.on('connection', connect);

export default io;
