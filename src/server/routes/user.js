export default (app) => {
    app.get('/@:username', (req, res) => {
        res.ssr({
            title: req.params.username,
            layout: 'user',
        });
    });
};
