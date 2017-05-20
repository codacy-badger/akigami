import http from 'http';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from 'config';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { normalizePort, requireFiles } from './utils';

const webpackConfig = require('../../webpack.config.js');

const compiler = webpack(webpackConfig());

const app = express();
const port = normalizePort(config.get('server.port'));

app.set('port', port);

app.set('views', path.join(__dirname, '..', '..', 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

if (config.get('enviroment') === 'development') {
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        noInfo: true,
        filename: 'app.js',
        publicPath: '/',
        stats: {
            colors: true,
        },
        historyApiFallback: true,
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
    }));
}

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
