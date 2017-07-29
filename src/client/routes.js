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
    user: {
        import: () => import(/* webpackChunkName: "user" */ './pages/User'),
    },
    error: {
        import: () => import(/* webpackChunkName: "error" */ './pages/Error'),
    },
};
