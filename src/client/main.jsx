import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import ReactModal from 'react-modal';
import debugNamespace from 'debug';
import AppStore from './v2/stores/AppStore';
import App from './v2/App';
import { ApolloClient } from './v2/lib/modules';

window.localStorage.debug = 'akigami:client:*';
const debug = debugNamespace('akigami:client');

(async () => {
  const raw = document.querySelector('#preload-data');
  const userData = JSON.parse(document.body.dataset.user);
  const app = new AppStore();

  app.user.setUserData(userData);

  await app.router.setContainer({
    title: raw.dataset.title,
    props: raw.text ? JSON.parse(raw.text) : null,
    layout: raw.dataset.layout,
  });

  const res = await ApolloClient.query({
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

  const res2 = await ApolloClient.query({
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
