import { ApolloClient } from '../../../lib/modules';

export default class Auth {

  constructor(app) {
    this.app = app;
    if (typeof window !== 'undefined') {
      const [, token] = /auth\/(.*)/.exec(window.location.pathname);
      ApolloClient.mutate({
        mutation: `
        mutation {
          auth(token: "${token}")
        }
        `,
      });
    }
  }
}
