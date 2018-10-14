import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from 'config';
import path from 'path';
import passport from 'passport';

import { gql } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { ApolloEngine } from 'apollo-engine';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { requireFiles } from './utils';
import engineConfig from './config/engine';
import ssr from './services/ssr';

import './services/database';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const app = express();
const schema = { typeDefs, resolvers };
const engine = new ApolloEngine(engineConfig);

app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
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

const port = config.get('server.port');
const WS_GQL_PATH = '/graphql';

engine.listen({ port, expressApp: app, graphqlPaths: [WS_GQL_PATH] }, () => {
  console.log(`APP is now running on http://localhost:${port}`); // eslint-disable-line no-console
  console.log(`API Server over web socket with subscriptions is now running on ws://localhost:${port}${WS_GQL_PATH}`); // eslint-disable-line no-console
  // eslint-disable-next-line
  new SubscriptionServer({
    schema,
    execute,
    subscribe,
  }, {
    path: WS_GQL_PATH,
    server: engine.httpServer,
  });
});
