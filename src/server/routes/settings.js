export default (app) => {
    app.get('/settings', (req, res) => {
        res.ssr({
            title: 'Настройки - Акигами',
            layout: 'settings',
        });
    });
};
