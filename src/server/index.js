import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from 'config';
import path from 'path';
import passport from 'passport';
import cookie from 'cookie';
import { gql, makeExecutableSchema, ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { ApolloEngine } from 'apollo-engine';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { requireFiles, getFiles } from './utils';
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


const contextModels = getFiles('models');
const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  cacheControl: true,
  engine: false,
  playground: true,
  context: ({ req }) => ({
    user: req.user,
    ...contextModels,
  }),
});
const engine = new ApolloEngine(engineConfig);

app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(config.get('sessionSecret')));
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

const port = config.get('server.port');
const GQL_PATH = '/graphql';

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

server.applyMiddleware({ app });

engine.listen({ port, expressApp: app, graphqlPaths: [GQL_PATH] }, () => {
  console.log(`APP is now running on http://localhost:${port}`); // eslint-disable-line no-console
  console.log(`API Server over web socket with subscriptions is now running on ws://localhost:${port}${GQL_PATH}`); // eslint-disable-line no-console
  // eslint-disable-next-line
  new SubscriptionServer({
    schema,
    execute,
    subscribe,
    onOperation: (msg, params, socket) => new Promise((resolve) => {
      const wsSessionUser = null;
      if (socket.upgradeReq) {
        const cookies = cookie.parse(socket.upgradeReq.headers.cookie);
        const sessionID = cookieParser.signedCookie(
          cookies['connect.sid'],
          config.get('sessionSecret'),
        );

        const baseContext = {
          context: {
            user: wsSessionUser,
            ...contextModels,
          },
        };

        const paramsWithFulfilledBaseContext = Object.assign(
          {},
          params,
          baseContext,
        );

        if (!sessionID) {
          resolve(paramsWithFulfilledBaseContext);

          // return;
        }

        // get the session object
        // sessionStore.get(sessionID, (err, session) => {
        //   if (err) {
        //     throw new Error('Failed retrieving sessionID from the sessionStore.');
        //   }

        //   if (session && session.passport && session.passport.user) {
        //     const sessionUser = session.passport.user;
        //     wsSessionUser = {
        //       login: sessionUser.username,
        //       html_url: sessionUser.profileUrl,
        //       avatar_url: sessionUser.photos[0].value,
        //     };

        //     resolve(Object.assign(paramsWithFulfilledBaseContext, {
        //       context: Object.assign(
        //         paramsWithFulfilledBaseContext.context,
        //         {
        //           user: wsSessionUser,
        //         },
        //       ),
        //     }));
        //   }

        //   resolve(paramsWithFulfilledBaseContext);
        // });
      }
    }),
  }, {
    path: GQL_PATH,
    server: engine.httpServer,
  });
});
