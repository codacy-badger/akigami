const socket = (
  typeof window !== 'undefined'
    // ? require('socket.io-client')({ transports: ['websocket'], upgrade: false }).connect()
    ? null
    : null
);

const ApolloLink = typeof window !== 'undefined' ? require('apollo-link').ApolloLink : null;
const AC = typeof window !== 'undefined' ? require('apollo-client').ApolloClient : null;
const InMemoryCache = typeof window !== 'undefined' ? require('apollo-cache-inmemory').InMemoryCache : null;
const WebSocketLink = typeof window !== 'undefined' ? require('apollo-link-ws').WebSocketLink : null;
const onError = typeof window !== 'undefined' ? require('apollo-link-error').onError : null;
const cookie = typeof window !== 'undefined' ? require('cookie') : null;
const gql = typeof window !== 'undefined' ? require('graphql-tag') : null;

const middlewareLink = typeof window !== 'undefined' ? new ApolloLink((operation, forward) => {
  operation.authToken = cookie.parse(document.cookie).sid;
  return forward(operation);
}) : null;

const ApolloClient = (
  typeof window !== 'undefined'
    ? new AC({
      link: ApolloLink.from([
        middlewareLink,
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
            connectionParams: {
              location: document.location,
            },
          },
        }),
      ]),
      cache: new InMemoryCache(),
    })
    : null
);
if (typeof window !== 'undefined') {
  const { query, mutate, subscribe } = ApolloClient;
  ApolloClient.query = (obj) => {
    obj.query = gql(obj.query);
    return query(obj);
  };
  ApolloClient.mutate = (obj) => {
    obj.mutation = gql(obj.mutation);
    return mutate(obj);
  };
  /* ApolloClient.subscribe = (obj) => {
    if (obj.query) {
      obj.query = gql(obj.query);
    }
    return subscribe(obj);
  }; */
}

export { socket, ApolloClient };
