import Redis from 'ioredis';
import config from 'config';

export default new Redis({
  host: config.get('redis.host'),
  port: config.get('redis.port'),
  family: 4,
  password: config.get('redis.pass'),
  db: 0,
});
