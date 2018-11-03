import gql from 'graphql-tag';

export const typeDef = gql`
  extend type Query {
    user(id: ID!): User
    users(limit: Int): [User]
    getMe: User
  }
  
  extend type Mutation {
    addUser(
      displayName: String!
      email: String!
      birthday: String
      avatar: String
      cover: String
      status: String
      name: String
      city: String
      gender: String
    ): User
  }

  type User {
    id: ID!
    username: String
    displayName: String
    email: String
    birthday: String
    avatar: String
    cover: String
    status: String
    name: String
    city: String
    online: Boolean
    gender: String
    createdAt: String
    visitedAt: String
  }
`;

export const resolvers = {
  Query: {
    users: async (parent, { limit = 0 }, ctx) => {
      const { User } = ctx.models;
      const users = await User.find({}).limit(limit);
      // console.log('users', users);
      return users;
    },
    user: async (parent, { id }, ctx) => {
      const { User } = ctx.models;
      const user = await User.findById(id);
      return user;
    },
    getMe: async (parent, args, ctx) => {
      // console.log('getme', ctx.user);
      return ctx.user;
    },
  },
  Mutation: {
    addUser: async (parent, args, ctx) => {
      const { User } = ctx.models;
      const user = new User({
        ...args,
        username: args.displayName.toLowerCase(),
      });
      const newUser = await user.save();
      return newUser;
    },
  },
};
