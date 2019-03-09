import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'emotion-theming';
import debugNamespace from 'debug';
import AppStore from './stores/AppStore';
import App from './App';
import { ApolloClient } from './lib/modules';
import theme from '../common/theme';

window.localStorage.debug = 'akigami:client:*';
const debug = debugNamespace('akigami:client:main');

(async () => {
  const userData = JSON.parse(document.body.dataset.user);
  const app = new AppStore();
  app.apolloClient = ApolloClient;
  app.user.setUserData(userData);
  app.user.setListener();

  await app.router.setContainer(document.location.pathname);
  const res = await app.apolloClient.query({
    query: `
      {
        users {
          id
          displayName
          username
          email
          gender
          avatar
          cover
          status
          birthday
          name
          city
          online
          createdAt
          visitedAt
        }
      }
    `,
  });
  debug('users', res);

  const res2 = await app.apolloClient.query({
    query: `
      {
        getMe {
          id
          displayName
          username
        }
      }
    `,
  });
  debug('currentUser', res2);

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Provider {...app.provide()}>
        <App />
      </Provider>
    </ThemeProvider>,
    document.getElementById('root'),
  );
})();
