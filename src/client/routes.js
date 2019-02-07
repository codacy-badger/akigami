export default {
  feed: {
    import: () => import(/* webpackChunkName: "feed" */ './pages/Feed'),
  },
  auth: {
    import: () => import(/* webpackChunkName: "auth" */ './pages/Auth'),
  },
  login: {
    import: () => import(/* webpackChunkName: "login" */ './pages/Login'),
  },
  register: {
    import: () => import(/* webpackChunkName: "register" */ './pages/Register'),
  },
  profile: {
    import: () => import(/* webpackChunkName: "profile" */ './pages/User'),
  },
  explore: {
    import: () => import(/* webpackChunkName: "explore" */ './pages/Explore'),
  },
  studios: {
    import: () => import(/* webpackChunkName: "studios" */ './pages/Studios'),
  },
  studio: {
    import: () => import(/* webpackChunkName: "studio" */ './pages/Studio'),
  },
  addAnimeEntity: {
    import: () => import(/* webpackChunkName: "addAnimeEntity" */ './pages/AddAnimeEntity'),
  },
  addStudio: {
    import: () => import(/* webpackChunkName: "addStudio" */ './pages/addStudio'),
  },
  error: {
    import: () => import(/* webpackChunkName: "error" */ './pages/Error'),
  },
  admin: {
    import: () => import(/* webpackChunkName: "admin" */ './pages/admin/Dashboard'),
  },
  'admin:genres': {
    import: () => import(/* webpackChunkName: "admin:genres" */ './pages/admin/Genres'),
  },
  'admin:users': {
    import: () => import(/* webpackChunkName: "admin:users" */ './pages/admin/Users'),
  },
  // settings: {
  //     import: () => import(/* webpackChunkName: "settings" */ './pages/Settings'),
  // },
  // entity: {
  //     import: () => import(/* webpackChunkName: "explore" */ './pages/Entity'),
  // },
};
