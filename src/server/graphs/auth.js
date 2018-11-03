import gql from 'graphql-tag';
import { withFilter } from 'apollo-server';
import url from 'url';
import GraphQLJSON from 'graphql-type-json';
import cookieParser from 'cookie-parser';
import config from 'config';
import pick from 'lodash/pick';
import PubSub from '../services/gqlpubsub';
import RedisStore from '../config/store';
import { sendLogin, sendRegister } from '../email';

const redisStore = Promise.promisifyAll(RedisStore);

export const typeDef = gql`
  scalar JSON

  extend type Query {
    validateUsername(username: String): JSON
  }

  extend type Mutation {
    sendEmail(
      email: String
    ): Boolean

    signup(token: String, username: String, gender: String, birthday: String): JSON

    auth(token: String): Boolean
  }
  extend type Subscription {
    changed: JSON
  }
`;

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    validateUsername: async (parent, args, ctx) => {
      const { username } = args;
      if (
        !/^\w+$/g.test(username) ||
        username.length < 3 ||
        username.length > 40
      ) {
        return { status: 'ok', is_valid: false, exists: false };
      }
      const user = await ctx.models.User.findOne({ username: new RegExp(`^${username}$`, 'i') });
      return { status: 'ok', is_valid: true, exists: !!user };
    },
  },
  Mutation: {
    sendEmail: async (parent, args, ctx, info) => {
      const { email } = args;
      if (/.+@.+\..+/i.test(email)) {
        const emailLC = email.toLowerCase();
        const { protocol, host } = url.parse(ctx.location.origin);
        const emailToken = await ctx.models.EmailToken.create({ email: emailLC, listenToken: ctx.token });
        const formattedUrl = url.format({
          protocol,
          host,
          pathname: `email-verification/${emailToken.token}`,
        });
        const isLogin = await emailToken.isLogin();
        if (isLogin) {
          // console.log(formattedUrl);
          sendLogin({ email, link: formattedUrl });
        } else {
          // console.log(formattedUrl);
          sendRegister({ email, link: formattedUrl });
        }
        // socket.join(`sign:${emailToken.listenToken}`);
      }
      return false;
    },
    signup: async (parent, args, ctx, info) => {
      const { token, username, gender, birthday } = args;
      if (!token) {
        return { success: false, message: 'no_token' };
      }
      const emailToken = await ctx.models.EmailToken.findOne({ token });
      if (!emailToken) {
        return { success: false, message: 'no_token' };
      }
      const data = {
        displayName: username,
        username: username.toLowerCase(),
        email: emailToken.email,
        gender,
        birthday,
        // gender and date
      };
      try {
        const user = await ctx.models.User.create(data);

        const sessionID = cookieParser.signedCookie(
          emailToken.listenToken,
          config.get('sessionSecret'),
        );

        const sess = await redisStore.getAsync(sessionID);
        sess.passport = {
          user: user.id,
        };
        await redisStore.setAsync(sessionID, sess);
        const pickedUser = pick(user, [
          'id',
          'avatar',
          'username',
          'displayName',
          'link',
        ]);
        PubSub.publish('CHANGED', {
          token: emailToken.listenToken,
          changed: {
            action: 'login',
            data: { user: pickedUser },
          },
        });
        await emailToken.remove();
        return {};
      } catch (e) {
        console.error(e);
        return { success: false, message: 'account_create_failed' };
      }
    },
    auth: async (parent, args, ctx, info) => {
      const { token } = args;
      if (!token) {
        return false;
      }
      const emailToken = await ctx.models.EmailToken.findOne({ token });
      if (!emailToken) {
        return false;
      }

      const sessionID = cookieParser.signedCookie(
        emailToken.listenToken,
        config.get('sessionSecret'),
      );
      const user = await ctx.models.User.findOne({ email: emailToken.email });
      const sess = await redisStore.getAsync(sessionID);
      sess.passport = {
        user: user.id,
      };
      await redisStore.setAsync(sessionID, sess);
      const pickedUser = pick(user, [
        'id',
        'avatar',
        'username',
        'displayName',
        'link',
      ]);
      PubSub.publish('CHANGED', {
        token: emailToken.listenToken,
        changed: {
          action: 'login',
          data: { user: pickedUser },
        },
      });
      await emailToken.remove();
      return true;
    },
  },
  Subscription: {
    changed: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: withFilter(() => PubSub.asyncIterator('CHANGED'), async (payload, variables, context, info) => {
        if (payload && payload.token === context.token) {
          return true;
        }
        return false;
      }),
    },
  }
};
