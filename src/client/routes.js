export default {
    index: {
        import: () => import(/* webpackChunkName: "index" */ './pages/Main'),
    },
    user: {
        import: () => import(/* webpackChunkName: "user" */ './pages/User'),
    },
    error: {
        import: () => import(/* webpackChunkName: "error" */ './pages/Error'),
    },
};
