import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import ReactModal from 'react-modal';
import debugNamespace from 'debug';
import AppStore from './stores/AppStore';
import App from './App';
import { ApolloClient } from './lib/modules';

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

  if (typeof window !== 'undefined') {
    ReactModal.setAppElement('#root');
  }
  ReactDOM.render(
    <Provider app={app}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
})();
