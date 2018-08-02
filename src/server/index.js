import http from 'http';
import express from 'express';
import path from 'path';
import lusca from 'lusca';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import config from 'config';
import passport from 'passport';
import session from 'express-session';

import { normalizePort, requireFiles } from './utils';
import ssr from './services/ssr';
import io from './services/websockets';
import './services/database';
import redisStore from './config/store';

const app = express();
const port = normalizePort(config.get('server.port'));
const icon = path.join(__dirname, '..', '..', 'public', 'favicon.ico');

app.set('port', port);
if (icon) app.use(favicon(icon));
app.use(logger('dev', {
  skip: (req, res) => res.statusCode < 400,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  name: 'sid',
  secret: config.get('sessionSecret'),
  store: redisStore,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 2630000 * 5, // 5 months
  },
  resave: true,
  saveUninitialized: true,
}));

app.use(lusca({
  csrf: false,
  csp: false,
  xframe: 'DENY', // or SAMEORIGIN
  p3p: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
  },
  xssProtection: true,
}));

app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use(passport.initialize());
app.use(passport.session());
require('./services/passport');

app.use((req, res, next) => {
  res.locals.user = req.isAuthenticated() ? req.user : null;
  console.log(`hi ${req.user ? req.user.username : 'guest'}`);
  next();
});

app.use((req, res, next) => {
  res.ssr = ssr;
  next();
});

requireFiles('routes', app);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, nextIgnored) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.ssr({
    title: 'Ошибка',
    layout: 'error',
  });
});

const server = http.createServer(app);
io.attach(server);
io.set('transports', ['websocket']);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
  case 'EACCES':
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(`${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  console.log(`Akigami Server listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
