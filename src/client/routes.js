export default {
    index: {
        import: () => import(/* webpackChunkName: "index" */ './pages/Main'),
    },
    login: {
        import: () => import(/* webpackChunkName: "login" */ './pages/Login'),
    },
    signup: {
        import: () => import(/* webpackChunkName: "signup" */ './pages/SignUp'),
    },
    recovery: {
        import: () => import(/* webpackChunkName: "recovery" */ './pages/Recovery'),
    },
    profile: {
        import: () => import(/* webpackChunkName: "profile" */ './pages/Profile'),
    },
    error: {
        import: () => import(/* webpackChunkName: "error" */ './pages/Error'),
    },
    settings: {
        import: () => import(/* webpackChunkName: "settings" */ './pages/Settings'),
    },
    explore: {
        import: () => import(/* webpackChunkName: "explore" */ './pages/Explore'),
    },
};
