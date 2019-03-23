import sample from 'lodash/sample';

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
      ctx.app.ui.changeTransparented(true);
      const image = sample([
        '/images/auth-1.jpg',
        '/images/auth-2.jpg',
        '/images/auth-3.jpg',
        '/images/auth-4.jpg',
      ]);
      return {
        title: 'Вход',
        component: await import(/* webpackChunkName: "login" */ './pages/Login'),
        params: {
          image,
          ui: ctx.app.ui,
        },
      };
    },
  },
];

export default routes;
