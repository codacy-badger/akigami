import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import ReactModal from 'react-modal';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';
import AppStore from './stores/AppStore';
import App from './v2/App';

(async () => {
  const raw = document.querySelector('#preload-data');
  const userData = JSON.parse(document.body.dataset.user);
  const app = new AppStore();

  app.user.setUser(userData);

  await app.router.setContainer({
    title: raw.dataset.title,
    props: raw.text ? JSON.parse(raw.text) : null,
    layout: raw.dataset.layout,
  });

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) => (
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
          ));
        }
        if (networkError) console.log('[Network error]:', networkError);
      }),
      new WebSocketLink({
        uri: 'ws://localhost:3000/graphql',
        options: {
          reconnect: true,
        },
      }),
    ]),
    cache: new InMemoryCache(),
  });

  console.log(client);
  const res = await client.query({
    query: gql`
      {
        hello
      }
    `,
  });
  console.log({ res });

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
