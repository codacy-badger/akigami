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
    action: async (ctx, params) => ({
      title: 'Вход',
      component: await import(/* webpackChunkName: "login" */ './pages/Login'),
    }),
  },
];

export default routes;
