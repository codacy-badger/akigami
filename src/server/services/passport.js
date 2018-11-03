import mongoose from 'mongoose';
import passport from 'passport';
import CustomStrategy from 'passport-custom';

const User = mongoose.model('User');
const EmailToken = mongoose.model('EmailToken');
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  'passwordless',
  new CustomStrategy(async (req, callback) => {
    const { token } = req.params;
    if (!token) {
      callback(null, false);
      return;
    }
    const emailToken = await EmailToken.findOne({ token });
    if (!emailToken) {
      callback(null, false);
      return;
    }
    const user = await User.findOne({ email: emailToken.email }).select('-_id id username avatar displayName');
    callback(null, user, emailToken.listenToken);
  }),
);
