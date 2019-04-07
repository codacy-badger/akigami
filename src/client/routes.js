import sample from 'lodash/sample';

const notFoundError = () => {
  const err = new Error();
  err.status = 404;
  return Promise.reject(err);
};

const routes = [
  {
    path: '/', // optional
    action: async () => ({
      title: 'Главная',
      component: await import(/* webpackChunkName: "feed" */ './pages/Feed'),
    }),
  },
  {
    path: '/signin',
    action: async (ctx, params) => {
      const props = {
        title: 'Вход',
      };
      ctx.app.ui.changeTransparented(true);
      if (!ctx.app.router.hydrateEnabled) {
        const image = sample([
          '/images/auth-1.jpg',
          '/images/auth-2.jpg',
          '/images/auth-3.jpg',
          '/images/auth-4.jpg',
        ]);
        props.params = {
          image,
        };
      }
      return {
        component: await import(/* webpackChunkName: "login" */ './pages/Login'),
        ...props,
      };
    },
  },
  {
    path: '/auth/:token',
    action: async (ctx, params) => {
      const response = await ctx.app.apolloClient.query({
        query: `{
          checkToken(token: "${params.token}")
        }`,
      });
      if (response.data.checkToken !== 'auth') {
        return notFoundError();
      }
      return {
        title: 'Авторизация',
        component: await import(/* webpackChunkName: "auth" */ './pages/Auth'),
        params,
      };
    },
  },
  {
    path: '/email-verification/:token',
    action: async (ctx, params) => {
      const response = await ctx.app.apolloClient.query({
        query: `{
          checkToken(token: "${params.token}")
        }`,
      });
      switch (response.data.checkToken) {
      case 'notfound':
        return notFoundError();
      case 'auth':
        return { redirect: `/auth/${params.token}` };
      case 'signup':
        return { redirect: `/signup/${params.token}` };
      default:
        return { redirect: '/404' };
      }
    },
  },
];

export default routes;
