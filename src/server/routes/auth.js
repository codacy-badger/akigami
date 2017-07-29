import mongoose from 'mongoose';
import passport from 'passport';
import pick from 'lodash/pick';

import io from '../services/websockets';

const User = mongoose.model('User');
const EmailToken = mongoose.model('EmailToken');
const getUsersByRoom = (room) => typeof io.of('/').adapter.rooms[room] !== 'undefined' ? io.of('/').adapter.rooms[room].length : 0;
const removeUsersFromRoom = (room) => typeof io.of('/').adapter.rooms[room] != 'undefined' && Object.keys(io.sockets.adapter.rooms[room].sockets).forEach((s) => {
    io.sockets.sockets[s].leave(room);
});
export default (app) => {

    app.get('/signin', (req, res) => {
        res.ssr({
            title: 'Вход',
            layout: 'login',
        });
    });

    app.get('/signup/:token', async (req, res, next) => {
        const token = req.params.token;
        if (!token) {
            return next();
        }
        const emailToken = await EmailToken.findOne({ token });
        if (!emailToken) {
            return next();
        }
        res.ssr({
            title: 'Регистрация',
            layout: 'signup',
            props: { email: emailToken.email },
        });
    });

    app.all('/email-verification/:token', async (req, res, next) => {
        const token = req.params.token;
        if (!token) {
            return next();
        }
        const emailToken = await EmailToken.findOne({ token });
        if (!emailToken) {
            return next();
        }
        const hasUser = await User.findOne({ email: emailToken.email }).select('id');
        if (!hasUser) {
            const room = `sign:${emailToken.listenToken}`;
            if (getUsersByRoom(room) > 0) {
                io.to(`sign:${emailToken.listenToken}`).emit('sign:listen', {
                    action: 'redirect',
                    data: {
                        pathname: `/signup/${token}`,
                    },
                });
                removeUsersFromRoom(`sign:${emailToken.listenToken}`);
                return res.send('Закройте эту вкладку и перейдите к прежней<script>window.close();</script>');
            }
            return res.redirect(`/signup/${token}`);
        }
        passport.authenticate('passwordless', (err, user, listen) => {
            if (err) {
                return next();
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                emailToken.remove();
                const pickedUser = pick(user, ['id', 'avatar', 'username', 'displayName', 'link']);
                const room = `sign:${listen}`;
                if (getUsersByRoom(room) > 0) {
                    io.to(`sign:${listen}`).emit('sign:listen', { action: 'login', data: { user: pickedUser } });
                    removeUsersFromRoom(`sign:${listen}`);
                    return res.send('Закройте эту вкладку и перейдите к прежней<script>window.close();</script>');
                }
                return res.redirect('/news');
            });
        })(req, res, next);
    });

    app.post('/api/signup', async (req, res, next) => {
        if (!req.isAuthenticated()) {
            const token = req.body.token;
            if (!token) {
                return res.send({ success: false, message: 'no_token' });
            }
            const emailToken = await EmailToken.findOne({ token });
            if (!emailToken) {
                return res.send({ success: false, message: 'no_token' });
            }
            const data = {
                displayName: req.body.username,
                username: req.body.username.toLowerCase(),
                email: emailToken.email,
                gender: req.body.gender,
                birthday: req.body.birthday,
                // gender and date
            };
            try {
                const user = await User.create(data);
                await new Promise((resp) => {
                    req.logIn(user, resp);
                });
                await emailToken.remove();
                return res.send({
                    success: true,
                    message: 'account_successful_created',
                    user: pick(user, ['username', 'displayName', 'avatar'])
                });
            } catch (e) {
                console.error(e);
                return res.send({ success: false, message: 'account_create_failed' });
            }
        }
        next();
    });

    app.post('/api/logout', (req, res, next) => {
        if (req.isAuthenticated()) {
            // io.emit(`profile:${req.user.username}`, { online: false });
            req.logOut();
            req.session.destroy();
            return res.status(200).json('logout');
        }
        next();
    });
};
