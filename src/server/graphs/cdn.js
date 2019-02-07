import gql from 'graphql-tag';
import config from 'config';
import redis from '../services/redis';

export const typeDef = gql`
  extend type Query {
    getFromCDN(hash: String!): String
  }
`;

export const resolvers = {
  Query: {
    getFromCDN: async (parent, { hash }) => {
      if (!hash) throw new Error('Hash not defined');
      const str = await redis.hget('upload_hash', hash);
      if (!str) throw new Error('Hash not found');
      const { url } = JSON.parse(str);
      if (!url) throw new Error('No URL in hash');
      return config.get('cdn.address') + url;
    },
  },
};
