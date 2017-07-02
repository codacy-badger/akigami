export default {
    index: {
        import: () => import(/* webpackChunkName: "index" */ './pages/Main'),
    },
    user: {
        import: () => import(/* webpackChunkName: "user" */ './pages/User'),
    },
    settings: {
        import: () => import(/* webpackChunkName: "settings" */ './pages/Settings'),
    },
    error: {
        import: () => import(/* webpackChunkName: "error" */ './pages/Error'),
    },
};
