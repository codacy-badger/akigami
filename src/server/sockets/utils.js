import cookie from 'cookie';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import store from '../config/store';

const redisStore = Promise.promisifyAll(store);
const initializeAsync = Promise.promisify(passport.initialize());
const sessionAsync = Promise.promisify(passport.session());

export default (socket) => {
    const module = {};
    module.updateInfo = async (socket) => {
        const session = await redisStore.getAsync(cookieParser.signedCookie(cookie.parse(socket.request.headers.cookie).sid, process.env.SESSION_SECRET));
        socket.request.session = session;
        await initializeAsync(socket.request, {});
        await sessionAsync(socket.request, {});
    };
    module.check = async (role) => {
        await module.updateInfo(socket);
        return new Promise((res) => {
            switch (role) {
            case 'any':
                return res();
            case 'user':
                if (socket.request.user) {
                    return res();
                }
                return null;
            case 'admin':
                if (socket.request.user && socket.request.user.role === 'admin') {
                    return res();
                }
                return null;
            default:
                return null;
            }
        });
    };
    return module;
};
