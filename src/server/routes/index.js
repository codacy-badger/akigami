export default (app) => {
    app.get('/', (req, res) => {
        res.ssr({
            title: 'Главная',
            layout: 'index',
        });
    });
};
