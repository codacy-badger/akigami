/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { toJS } from 'mobx';
import { Provider } from 'mobx-react';
import { renderToNodeStream } from 'react-dom/server';
import { ThemeProvider } from 'emotion-theming';
import gql from 'graphql-tag';
import pick from 'lodash/pick';
import forEach from 'lodash/forEach';
import { schema } from '../graphs';
import AppStore from '../../client/stores/AppStore';
import App from '../../client/App';
import { getFiles } from '../utils';
import theme from '../../common/theme';

const contextModels = getFiles('models', null, true, true);

function startRender({ title, user, screen }) {
  return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <title>${title} ~ akigami</title>
        <meta name="theme-color" content="#060606">
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="stylesheet" href="/fonts/stylesheet.css">
        <link rel="stylesheet" href="/external/reset.css">
      </head>
      <body data-user=${JSON.stringify(user || {})}>
        <div id="root">`;
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

function endRender({ cache, h }) {
  return `</div>
        <script>window.__APOLLO_STATE__=${JSON.stringify(cache.extract())}</script>
        <script>window.h=${JSON.stringify(h, getCircularReplacer())}</script>
        <script type="text/javascript" src="/assets/modules.chunk.js"></script>
        <script type="text/javascript" src="/assets/app.js"></script>
      </body>
    </html>
  `;
}

export default app => {
  app.get('*', async (req, res) => { // eslint-disable-line consistent-return
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
    await appStore.ui.setIsMobile(!req.useragent.isDesktop);
    const { title, redirect } = await appStore.router.setContainer(req.url);
    res.write(startRender({ title, user }));
    if (redirect) {
      return res.redirect(redirect);
    }

    const h = Object.assign({}, {
      router: toJS(appStore).router,
    });
    delete h.router.router;
    delete h.router.app;
    delete h.router.container?.props?.store?.app;

    const stream = renderToNodeStream((
      <ThemeProvider theme={theme}>
        <Provider {...appStore.provide()}>
          <App />
        </Provider>
      </ThemeProvider>
    ));
    stream.pipe(res, { end: 'false' });
    stream.on('end', () => {
      res.write(endRender({ cache, h }));
      res.end();
    });
  });
};
