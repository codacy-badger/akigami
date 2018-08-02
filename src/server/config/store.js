import session from 'express-session';
import ioredis from 'ioredis';
import config from 'config';

const RedisStore = require('connect-redis')(session);

const sessionStore = new RedisStore({
  client: ioredis.createClient({
    host: config.get('redis.host'),
    port: config.get('redis.port'),
    family: 4,
    password: config.get('redis.pass'),
    db: 1,
  }),
});
export default sessionStore;
