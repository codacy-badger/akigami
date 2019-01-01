import gql from 'graphql-tag';
import config from 'config';
import redis from '../services/redis';

export const typeDef = gql`
  extend type Query {
    getFromCDN(hash: String!): Image
  }

  type Image {
    small: String
    medium: String
    large: String
    original: String
  }
`;

export const resolvers = {
  Query: {
    getFromCDN: async (parent, { hash }) => {
      try {
        if (!hash) throw new Error('Hash not defined');
        const sizes = [
          { size: 128, key: 'small' },
          { size: 256, key: 'medium' },
          { size: 512, key: 'large' },
          { key: 'original' },
        ];
        const str = await redis.hget('upload_hash', hash);
        if (!str) throw new Error('Hash not found');
        const { url } = JSON.parse(str);
        if (!url) throw new Error('No URL in hash');
        const out = {};
        sizes.forEach(({ key, size }) => {
          out[key] = `${config.get('cdn.address')}${url}${size ? `?w=${size}` : ''}`;
        });
        return out;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
