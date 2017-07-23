import http from 'http';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import config from 'config';

import { normalizePort, requireFiles } from './utils';
import ssr from './services/ssr';
import './services/database';

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
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

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
        title: 'Ошибка - Акигами',
        layout: 'error',
    });
});

const server = http.createServer(app);
require('./services/websockets').default(server);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

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
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;

    console.log(`Akigami Server listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
