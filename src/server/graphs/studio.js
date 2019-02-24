import gql from 'graphql-tag';
import { getFromCDN } from '../utils/cdn';

export const typeDef = gql`
  extend type Query {
    studio(id: ID!): Studio
    studios(limit: Int): [Studio]
  }

  extend type Mutation {
    addStudio(
      title: String!,
      image: String,
      about: String
    ): Studio
    editStudio(
      id: ID!,
      title: String!,
      image: String,
      about: String
    ): Studio
  }

  type Studio {
    id: ID!
    title: String!
    image: String
    about: String
    createdAt: String
  }
`;

export const resolvers = {
  Query: {
    studios: async (parent, { limit = 0 }, ctx) => {
      const { Studio } = ctx.models;
      const studios = await Studio.find({}).limit(limit);
      return studios;
    },
    studio: async (parent, { id }, ctx) => {
      const { Studio } = ctx.models;
      const studio = await Studio.findOne({ id });
      return studio;
    },
  },
  Mutation: {
    addStudio: async (parent, args, ctx) => {
      const { Studio } = ctx.models;
      const changedArgs = args;
      changedArgs.image = await getFromCDN(changedArgs.image);
      const newStudio = await Studio.create(changedArgs);
      return newStudio;
    },
    editStudio: async (parent, { id, ...args }, ctx) => {
      const { Studio } = ctx.models;
      const changedArgs = args;
      if (args.image) {
        changedArgs.image = await getFromCDN(changedArgs.image);
      }
      const studio = await Studio.findOneAndUpdate({ id }, changedArgs, { new: true });
      return studio;
    },
  },
};
