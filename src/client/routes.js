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
];

export default routes;
