import mongoose from 'mongoose';

export default (app) => {
    app.get('/@:username', async (req, res, next) => {
        const user = await mongoose.model('User')
            .findOne({ username: req.params.username });

        if (!user) return next();

        return res.ssr({
            title: user.displayName,
            layout: 'profile',
            props: {
                user,
            },
        });
    });
};
