import url from 'url';
import mongoose from 'mongoose';

const EmailToken = mongoose.model('EmailToken');

export default (socket) => {
    socket.on('auth:send', async (email = '') => {
        if (/.+@.+\..+/i.test(email)) {
            const emailLC = email.toLowerCase();
            const { protocol, host } = url.parse(socket.handshake.headers.origin);
            const emailToken = await EmailToken.create({ email: emailLC });
            const formatedUrl = url.format({
                protocol,
                host,
                pathname: `email-verification/${emailToken.token}`
            });
            const isLogin = await emailToken.isLogin();
            if (isLogin) {
                //sendLogin({ email, link: formatedUrl });
            } else {
                //sendRegister({ email, link: formatedUrl });
            }
        }
    });
};
