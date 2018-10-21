import fs from 'fs';
import path from 'path';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

export function getFiles(dir, ctx, es6, isClass) {
  const res = {};
  fs.readdirSync(path.join(__dirname, '..', dir)).forEach(file => {
    if (file.match(/\.js$/) !== null) {
      const name = file.replace('.js', '');
      const className = isClass ? upperFirst(camelCase(name)) : name;
      if (!ctx && !es6) {
        res[className] = require(path.join(__dirname, '..', dir, name));
      } else if (!ctx && es6) {
        res[className] = require(path.join(__dirname, '..', dir, name)).default;
      } else {
        res[className] = require(path.join(__dirname, '..', dir, name)).default(ctx);
      }
    }
  });
  return res;
}

export default { getFiles };
