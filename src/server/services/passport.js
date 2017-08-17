import mongoose from 'mongoose';
import passport from 'passport';
import CustomStrategy from 'passport-custom';

const User = mongoose.model('User');
const EmailToken = mongoose.model('EmailToken');
passport.serializeUser((user, done) => {
    done(null, user.username);
});
passport.deserializeUser((username, done) => {
    User.findOne({
        username: new RegExp(username, 'i')
    }).then((user) => Promise.resolve(done(null, user))).catch((err) => done(err, null));
});

passport.use('passwordless', new CustomStrategy(async (req, callback) => {
    const token = req.params.token;
    if (!token) {
        return callback(null, false);
    }
    const emailToken = await EmailToken.findOne({ token });
    if (!emailToken) {
        return callback(null, false);
    }
    const user = await User.findOne({ email: emailToken.email }).select('-_id id username avatar displayName');
    callback(null, user, emailToken.listenToken);
}
));