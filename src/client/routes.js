export default {
  feed: {
    import: () => import(/* webpackChunkName: "feed" */ './v2/pages/Feed'),
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
  // error: {
  //     import: () => import(/* webpackChunkName: "error" */ './pages/Error'),
  // },
  // settings: {
  //     import: () => import(/* webpackChunkName: "settings" */ './pages/Settings'),
  // },
  // explore: {
  //     import: () => import(/* webpackChunkName: "explore" */ './pages/Explore'),
  // },
  // entity: {
  //     import: () => import(/* webpackChunkName: "explore" */ './pages/Entity'),
  // },
};
