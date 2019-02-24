/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { Provider } from 'mobx-react';
import { renderToStaticMarkup } from 'react-dom/server';
import gql from 'graphql-tag';
import pick from 'lodash/pick';
import { schema } from '../graphs';
import AppStore from '../../client/stores/AppStore';
import App from '../../client/App';
import { getFiles } from '../utils';

const contextModels = getFiles('models', null, true, true);

export default app => {
  app.get('*', async (req, res) => {
    const cache = new InMemoryCache();
    const graphqlClient = new ApolloClient({
      ssr: true,
      cache,
      link: new SchemaLink({
        schema,
        context: {
          user: req.user,
          models: contextModels,
        },
      }),
    });
    const { query, mutate } = graphqlClient;
    graphqlClient.query = (obj) => {
      obj.query = gql(obj.query); // eslint-disable-line no-param-reassign
      return query(obj);
    };
    graphqlClient.mutate = (obj) => {
      obj.mutation = gql(obj.mutation); // eslint-disable-line no-param-reassign
      return mutate(obj);
    };
    const appStore = new AppStore();
    appStore.apolloClient = graphqlClient;
    const user = pick(req.user, [
      'username',
      'displayName',
      'id',
      'avatar',
      'role',
    ]);
    appStore.user.setUserData(user);
    const { title, redirect } = await appStore.router.setContainer2(req.url);
    if (redirect) {
      return res.redirect(redirect);
    }
    const html = renderToStaticMarkup((
      <Provider app={appStore}>
        <App />
      </Provider>
    ));
    res.send(`
    <!DOCTYPE html>
  <html lang="ru">

  <head>
    <title>${title} – Акигами</title>
    <meta name="theme-color" content="#060606">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="/assets/style.css" />
  </head>

  <body data-user=${JSON.stringify(user || {})}>
    <div id="root">${html}</div>
    <script>window.__APOLLO_STATE__=${JSON.stringify(cache.extract())}</script>
    <script type="text/javascript" src="/assets/modules.chunk.js"></script><script type="text/javascript" src="/assets/app.js"></script>
  </body>

  </html>`);
  });
};
