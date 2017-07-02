export default [
    {
        path: 'login',
        import: () => import(/* webpackChunkName: "modal_login" */ './containers/AuthModal'),
    },
    {
        path: 'register/:token',
        import: () => import(/* webpackChunkName: "modal_login" */ './containers/AuthModal'),
    },
    {
        path: '404',
        import: () => import(/* webpackChunkName: "modal_404" */ './containers/ModalNotFound'),
    },
];
