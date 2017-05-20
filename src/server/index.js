import http from 'http';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import config from 'config';

import { normalizePort, requireFiles } from './utils';

const app = express();
const port = normalizePort(config.get('server.port'));

app.set('port', port);

app.set('views', path.join(__dirname, '..', '..', 'views'));
app.set('view engine', 'hbs');
app.use(favicon(path.join(__dirname, '..', '..', 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

requireFiles('routes', app);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
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
