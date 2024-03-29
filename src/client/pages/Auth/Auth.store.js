export default class Auth {
  constructor(app) {
    this.app = app;
  }

  initClient = () => {
    if (_CLIENT_) {
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
