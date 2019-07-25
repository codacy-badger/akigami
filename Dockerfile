FROM node:latest

EXPOSE 4000
WORKDIR /app

ADD config /app/config
ADD public /app/public
ADD src /app/src
ADD tools /app/tools
ADD node_modules /app/node_modules
ADD babelrc.js /app/babelrc.js
ADD webpack.config.js /app/webpack.config.js

CMD [ "/bin/sh", "tools/prod.dev.sh" ]