import config from 'config';

export default {
  apiKey: config.get('apolloApiKey'),
  stores: [
    {
      name: 'publicResponseCache',
      inMemory: {
        cacheSize: 10485760,
      },
    },
    {
      name: 'privateResponseCache',
      inMemory: {
        cacheSize: 10485760,
      },
    },
    {
      name: 'pq',
      inMemory: {
        cacheSize: 5000000,
      },
    },
  ],
  persistedQueries: {
    store: 'pq',
  },
  sessionAuth: {
    store: 'privateResponseCache',
    header: 'Authorization',
  },
  queryCache: {
    publicFullQueryStore: 'publicResponseCache',
    privateFullQueryStore: 'privateResponseCache',
  },
  frontends: [
    {
      overrideGraphqlResponseHeaders: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  ],
  logging: {
    level: 'INFO',
  },
};
