export default {
  feed: {
    import: () => import(/* webpackChunkName: "feed" */ './v2/pages/Feed'),
  },
  auth: {
    import: () => import(/* webpackChunkName: "auth" */ './v2/pages/Auth'),
  },
  login: {
    import: () => import(/* webpackChunkName: "login" */ './v2/pages/Login'),
  },
  register: {
    import: () => import(/* webpackChunkName: "register" */ './v2/pages/Register'),
  },
  profile: {
    import: () => import(/* webpackChunkName: "profile" */ './v2/pages/User'),
  },
  explore: {
    import: () => import(/* webpackChunkName: "explore" */ './v2/pages/Explore'),
  },
  addAnimeEntity: {
    import: () => import(/* webpackChunkName: "addAnimeEntity" */ './v2/pages/AddAnimeEntity'),
  },
  error: {
    import: () => import(/* webpackChunkName: "error" */ './v2/pages/Error'),
  },
  admin: {
    import: () => import(/* webpackChunkName: "admin" */ './v2/pages/admin/Dashboard'),
  },
  'admin:genres': {
    import: () => import(/* webpackChunkName: "admin:genres" */ './v2/pages/admin/Genres'),
  },
  // settings: {
  //     import: () => import(/* webpackChunkName: "settings" */ './pages/Settings'),
  // },
  // entity: {
  //     import: () => import(/* webpackChunkName: "explore" */ './pages/Entity'),
  // },
};
