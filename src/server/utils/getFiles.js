import fs from 'fs';
import path from 'path';

export function getFiles(dir, ctx) {
  fs.readdirSync(path.join(__dirname, '..', dir)).forEach(file => {
    if (file.match(/\.js$/) !== null) {
      const name = file.replace('.js', '');
      const res = {};
      if (!ctx) {
        res[name] = require(path.join(__dirname, '..', dir, name));
      } else {
        res[name] = require(path.join(__dirname, '..', dir, name)).default(ctx);
      }
      return res;
    }
    return {};
  });
}

export default { getFiles };
