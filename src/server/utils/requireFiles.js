import fs from 'fs';
import path from 'path';

export function requireFiles(dir, ctx) {
  fs.readdirSync(path.join(__dirname, '..', dir)).forEach(file => {
    if (file.match(/\.js$/) !== null) {
      const name = file.replace('.js', '');
      if (!ctx) {
        require(path.join(__dirname, '..', dir, name));
      } else {
        require(path.join(__dirname, '..', dir, name)).default(ctx);
      }
    }
  });
}

export default { requireFiles };
