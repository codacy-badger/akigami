import gql from 'graphql-tag';

export const typeDef = gql`
  extend type Query {
    studio(id: ID!): Studio
    studios(limit: Int): [Studio]
  }

  extend type Mutation {
    addStudio(
      title: String!,
      image: String,
      about: String,
      createdAt: String
    ): Studio
    editStudio(
      id: ID!,
      title: String!,
      image: String,
      about: String,
      createdAt: String
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
      const studio = new Studio(args);
      const newStudio = await studio.save();
      return newStudio;
    },
    editStudio: async (parent, { id, ...args }, ctx) => {
      const { Studio } = ctx.models;
      const studio = await Studio.findOneAndUpdate({ id }, args, { new: true });
      return studio;
    },
  },
};
