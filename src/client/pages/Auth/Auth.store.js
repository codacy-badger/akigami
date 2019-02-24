export default class Auth {

  constructor(app) {
    this.app = app;
    if (typeof window !== 'undefined') {
      const [, token] = /auth\/(.*)/.exec(window.location.pathname);
      this.app.apolloClient.mutate({
        mutation: `
        mutation {
          auth(token: "${token}")
        }
        `,
      });
    }
  }
}
