import config from 'config';
import got from 'got';
import gm from 'gm';
import busboy from 'then-busboy';
import FormData from 'form-data';
import uuid from 'uuid';
import redis from '../services/redis';

Promise.promisifyAll(gm.prototype);

const getWH = (type) => {
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
export default (app) => {
    app.post('/api/upload', async (req, res, next) => {
        const data = await busboy(req);
        const { width, height, x, y, type } = JSON.parse(data.data);
        // console.log(width, height, x, y)
        const test = gm(data.file.stream)
            .crop(width, height, x, y)
            .resize(...getWH(type))
            .stream();
        const form = new FormData();
        form.append('token', config.get('cdn_token'));
        form.append('file', test, 'filename.jpg');
        const { body } = await got.post(`${config.get('cdn_address')}/api/upload`, { body: form });
        try {
            const url = JSON.parse(body).path;
            const uid = uuid.v4();
            redis.hset('upload_hash', uid, JSON.stringify({ type, url }));
            return res.status(200).send(uid);
        } catch (e) { next(e); }
    });
};
