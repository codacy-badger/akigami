import { makeExecutableSchema } from 'apollo-server-express';
import gql from 'graphql-tag';
import merge from 'lodash/merge';

import { typeDef as User, resolvers as userResolvers } from './user';
import { typeDef as Auth, resolvers as authResolvers } from './auth';
import { typeDef as CDN, resolvers as CDNResolvers } from './cdn';

const Query = gql`
  type Query {
    _empty: String @deprecated
  }
  type Mutation {
    _empty: String @deprecated
  }
  type Subscription {
    _empty: String @deprecated
  }
`;

const defaultResolvers = {
  Query: {},
};

export const typeDefs = [
  Query,
  User,
  Auth,
  CDN,
];

export const resolvers = merge(
  defaultResolvers,
  userResolvers,
  authResolvers,
  CDNResolvers,
);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
