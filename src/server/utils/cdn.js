import config from 'config';
import redis from '../services/redis';

// eslint-disable-next-line import/prefer-default-export
export async function getFromCDN(hash) {
  if (!hash) return null;
  const str = await redis.hget('upload_hash', hash);
  if (!str) return null;
  const { url } = JSON.parse(str);
  if (!url) return null;
  return config.get('cdn.address') + url;
}
