import gql from 'graphql-tag';

export const typeDef = gql`
  extend type Query {
    genre(id: ID!): Genre
    genres(limit: Int): [Genre]
  }

  extend type Mutation {
    addGenre(title: String!): Genre
    editGenre(id: ID!, title: String!): Genre
  }

  type Genre {
    id: ID!
    title: String!
  }
`;

export const resolvers = {
  Query: {
    genres: async (parent, { limit = 0 }, ctx) => {
      const { Genre } = ctx.models;
      const genres = await Genre.find({}).limit(limit);
      return genres;
    },
    genre: async (parent, { id }, ctx) => {
      const { Genre } = ctx.models;
      const genre = await Genre.findById(id);
      return genre;
    },
  },
  Mutation: {
    addGenre: async (parent, { title }, ctx) => {
      const { Genre } = ctx.models;
      const genre = new Genre({ title });
      const newGenre = await genre.save();
      return newGenre;
    },
    editGenre: async (parent, { id, title }, ctx) => {
      const { Genre } = ctx.models;
      const genre = await Genre.findOneAndUpdate({ id }, { title }, { new: true });
      return genre;
    },
  },
};
