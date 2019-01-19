import express from 'express';
import cors from 'cors';
import debugNamespace from 'debug';
import bodyParser from 'body-parser';
import cookie from 'cookie';
import cookieParser from 'cookie-parser';
import config from 'config';
import path from 'path';
import passport from 'passport';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import session from 'express-session';

import { requireFiles, getFiles } from './utils';
import ssr from './services/ssr';
import { schema, typeDefs, resolvers } from './graphs';
import RedisStore from './config/store';
import './services/database';

const debug = debugNamespace('akigami:server');
const redisStore = Promise.promisifyAll(RedisStore);

const contextModels = getFiles('models', null, true, true);
const port = config.get('server.port');
const GQL_PATH = '/graphql';

const app = express();

app.use((req, res, next) => {
  res.ssr = ssr;
  next();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  cacheControl: true,
  engine: false,
  playground: true,
  context: ({ req }) => ({
    user: req.user,
    models: contextModels,
  }),
});
app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(config.get('sessionSecret')));

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

app.use(passport.initialize());
app.use(passport.session());
require('./services/passport');

app.use((req, res, next) => {
  res.locals.user = req.isAuthenticated() ? req.user : null;
  debug(`user: ${req.user ? req.user.username : 'guest'}`);
  next();
});

server.applyMiddleware({ app });

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
const s = app.listen({ port, graphqlPaths: [GQL_PATH] }, () => {
  debug(`APP is now running on http://localhost:${port}`);
  debug(`API Server over web socket with subscriptions is now running on ws://localhost:${port}${GQL_PATH}`);
});

SubscriptionServer.create({
  schema,
  execute,
  subscribe,
  onConnect: (connectionParams) => {
    return connectionParams;
  },
  onOperation: (msg, params, socket) => new Promise(async (resolve) => {
    const wsSessionUser = null;
    if (socket.upgradeReq) {
      const { sid } = cookie.parse(socket.upgradeReq.headers.cookie);
      const sessionID = cookieParser.signedCookie(
        sid,
        config.get('sessionSecret'),
      );

      const sess = await redisStore.getAsync(sessionID);
      const baseContext = {
        context: {
          user: wsSessionUser,
          models: contextModels,
          location: params.context.location,
          token: sid,
        },
      };

      const paramsWithFulfilledBaseContext = Object.assign(
        {},
        params,
        baseContext,
      );

      if (sess && sess.passport) {
        try {
          const currentUser = await contextModels.User.findById(sess.passport.user);
          resolve(Object.assign(paramsWithFulfilledBaseContext, {
            context: Object.assign(
              paramsWithFulfilledBaseContext.context,
              {
                user: currentUser,
              },
            ),
          }));
        } catch (e) {
          resolve(paramsWithFulfilledBaseContext);
        }
      } else {
        resolve(paramsWithFulfilledBaseContext);
      }
    }
  }),
}, {
  path: GQL_PATH,
  server: s,
});
