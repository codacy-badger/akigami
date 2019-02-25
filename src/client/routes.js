import UniversalRouter from 'universal-router';

const { pathToRegexp } = UniversalRouter;

const notFoundError = () => {
  const err = new Error();
  err.status = 404;
  return Promise.reject(err);
};

const routes = [
  {
    path: '/', // optional
    action: async () => ({ title: 'Главная', component: await import(/* webpackChunkName: "feed" */ './pages/Feed') }),
  },
  {
    path: '/@:username/:tab?/:subTab?',
    action: async (ctx, params) => {
      if (typeof window !== 'undefined' && ctx.app.router.currentURL?.startsWith(`/@${params.username}`)) {
        return { params };
      }
      const response = await ctx.app.apolloClient.query({
        query: `{
          getByUsername(username: "${params.username}") {
            id
            username
            displayName
          }
        }`,
      });
      if (response.data.getByUsername == null) {
        return notFoundError();
      }
      return { title: response.data.getByUsername.displayName, component: await import(/* webpackChunkName: "profile" */ './pages/User'), params };
    },
  },
  {
    path: '/explore/:type(anime|manga)',
    action: async (ctx, params) => {
      const title = `Обзор ${params.type === 'anime' ? 'аниме' : 'манги'}`;
      const regex = pathToRegexp(ctx.route.path);
      if (typeof window !== 'undefined' && regex.test(ctx.app.router.currentURL)) {
        return { title, params };
      }
      return { title, component: await import(/* webpackChunkName: "explore" */ './pages/Explore'), params };
    },
  },
  // закинуть в общий роут
  {
    path: '/explore/anime/create',
    action: async (ctx, params) => ({ title: 'Добавить новое аниме', component: await import(/* webpackChunkName: "addAnimeEntity" */ './pages/AddAnimeEntity'), params: { type: 'create' } }),
  },
  // {
  //   path: '/anime/:id',
  //   action: async (ctx, params) => {
  //     const response = await ctx.app.apolloClient.query({
  //       query: `{
  //         anime(id: "${params.id}") {
  //           id
  //           title
  //         }
  //       }`,
  //     });
  //     if (response.data.anime == null) {
  //       return notFoundError();
  //     }
  //     return { title: response.data.anime.title.romaji, component: await import(/* webpackChunkName: "profile" */ './pages/User'), params };
  //   },
  // },
  {
    path: '/studios',
    children: [
      {
        path: '',
        action: async () => ({ title: 'Студии', component: await import(/* webpackChunkName: "studios" */ './pages/Studios') }),
      },
      {
        path: '/create',
        action: async () => ({ title: 'Добавить новую студию', component: await import(/* webpackChunkName: "addStudio" */ './pages/AddStudio'), params: { type: 'create' } }),
      },
      {
        path: '/:id',
        children: [
          {
            path: '',
            action: async (ctx, params) => {
              const response = await ctx.app.apolloClient.query({
                query: `{
                  studio(id: "${params.id}") {
                    id
                    title
                  }
                }`,
              });
              if (response.data.studio == null) {
                return notFoundError();
              }
              return { title: response.data.studio.title, component: await import(/* webpackChunkName: "studio" */ './pages/Studio'), params };
            },
          },
          {
            path: '/edit',
            action: async (ctx, params) => {
              const response = await ctx.app.apolloClient.query({
                query: `{
                  studio(id: "${params.id}") {
                    id
                    title
                  }
                }`,
              });
              if (response.data.studio == null) {
                return notFoundError();
              }
              return { title: `Редактирование ${response.data.studio.title}`, component: await import(/* webpackChunkName: "addStudio" */ './pages/AddStudio'), params: { type: 'edit', ...params } };
            },
          },
        ],
      },
    ],
  },
  {
    path: '/signin',
    action: async (ctx, params) => ({ title: 'Вход', component: await import(/* webpackChunkName: "login" */ './pages/Login') }),
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
      return { title: 'Авторизация', component: await import(/* webpackChunkName: "auth" */ './pages/Auth'), params };
    },
  },
  {
    path: '/signup/:token',
    action: async (ctx, params) => {
      const response = await ctx.app.apolloClient.query({
        query: `{
          getEmailFromToken(token: "${params.token}")
        }`,
      });
      if (response.data.getEmailFromToken == null) {
        return notFoundError();
      }
      return { title: 'Регистрация', component: await import(/* webpackChunkName: "register" */ './pages/Register'), params: { email: response.data.getEmailFromToken, ...params } };
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
  {
    path: '/admin',
    action: (ctx) => {
      if (ctx.app.user.role !== 'admin') {
        return notFoundError();
      }
      return ctx.next();
    },
    children: [
      {
        path: '',
        action: async (ctx, params) => ({ title: 'Админ панель', component: await import(/* webpackChunkName: "admin" */ './pages/admin/Dashboard'), params: { activeTab: 'dashboard' } }),
      },
      {
        path: '/users',
        action: async (ctx, params) => ({ title: 'Список пользователей', component: await import(/* webpackChunkName: "admin:users" */ './pages/admin/Users'), params: { activeTab: 'users' } }),
      },
      {
        path: '/genres',
        action: async (ctx, params) => ({ title: 'Список жанров', component: await import(/* webpackChunkName: "admin:genres" */ './pages/admin/Genres'), params: { activeTab: 'genres' } }),
      },
    ],
  },
];
export default routes;
