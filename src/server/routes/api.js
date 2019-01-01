import config from 'config';
import got from 'got';
import gm from 'gm';
import busboy, { isFile } from 'then-busboy';
import FormData from 'form-data';
import uuid from 'uuid';
import redis from '../services/redis';

Promise.promisifyAll(gm.prototype);

const getWH = type => {
  switch (type) {
  case 'avatar':
    return [200, 200];
  case 'cover':
    return [1905, 448];
  default:
    return [1, 1];
  }
};

// await superagent.post(`${process.env.CDN_ADDRESS}/api/upload`).field('token', process.env.CDN_TOKEN).field('path', path).field('filename', filename).attach('file', file);
export default app => {
  app.post('/api/upload', async (req, res, next) => {
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
      res.send(JSON.stringify({ error: 'It is not form-data' }));
      return;
    }
    const data = await busboy(req);
    if (!isFile(data.file)) {
      res.send(JSON.stringify({ error: 'It is not file' }));
      return;
    }
    const form = new FormData();
    form.append('token', config.get('cdn.token'));
    form.append('file', data.file.stream, 'filename.jpg');
    const { body } = await got.post(`${config.get('cdn.address')}/api/upload`, {
      body: form,
    });
    try {
      const url = JSON.parse(body).path;
      const uid = uuid.v4();
      // потому что юзер может любой юрл передать
      redis.hset('upload_hash', uid, JSON.stringify({ url }));
      res.status(200).send(uid);
      return;
    } catch (e) {
      next(e);
    }
  });
};
