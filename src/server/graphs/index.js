import { makeExecutableSchema } from 'apollo-server-express';
import gql from 'graphql-tag';
import merge from 'lodash/merge';

import { typeDef as User, resolvers as userResolvers } from './user';

const Query = gql`
  type Query {
    _empty: String @deprecated
  }
  type Mutation {
    _empty: String @deprecated
  }
`;

const defaultResolvers = {
  Query: {},
};

export const typeDefs = [
  Query,
  User,
];

export const resolvers = merge(
  defaultResolvers,
  userResolvers,
);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
