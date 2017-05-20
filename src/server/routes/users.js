export default (app) => {
    app.get('/users', (req, res) => {
        res.send('respond with a resource');
    });
};

