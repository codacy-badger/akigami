let ApolloClient; // eslint-disable-line import/no-mutable-exports

if (_CLIENT_) {
  const { ApolloLink } = require('apollo-link');
  const AC = require('apollo-client').ApolloClient;
  const { InMemoryCache } = require('apollo-cache-inmemory');
  const { WebSocketLink } = require('apollo-link-ws');
  const { onError } = require('apollo-link-error');
  const gql = require('graphql-tag');

  ApolloClient = new AC({
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
        uri: `ws://${window.location.host}/graphql`,
        options: {
          reconnect: true,
          connectionParams: {
            location: document.location,
          },
        },
      }),
    ]),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
    ssrForceFetchDelay: 100,
  });
  const { query, mutate, subscribe } = ApolloClient;
  ApolloClient.query = (obj) => {
    obj.query = gql(obj.query); // eslint-disable-line no-param-reassign
    return query(obj);
  };
  ApolloClient.mutate = (obj) => {
    obj.mutation = gql(obj.mutation); // eslint-disable-line no-param-reassign
    return mutate(obj);
  };
  /* ApolloClient.subscribe = (obj) => {
    if (obj.query) {
      obj.query = gql(obj.query);
    }
    return subscribe(obj);
  }; */
}

export { ApolloClient }; // eslint-disable-line import/prefer-default-export
