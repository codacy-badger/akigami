import mongoose from 'mongoose';

const User = mongoose.model('User');
const EmailToken = mongoose.model('EmailToken');

export default app => {
  app.get('/signin', (req, res) => {
    res.ssr({
      title: 'Вход',
      layout: 'login',
    });
  });

  app.get('/recovery', (req, res) => {
    res.ssr({
      title: 'Восстановление',
      layout: 'recovery',
    });
  });

  app.get('/signup/:token', async (req, res, next) => {
    const { token } = req.params;
    if (!token) {
      next();
      return;
    }
    const emailToken = await EmailToken.findOne({ token });
    if (!emailToken) {
      next();
      return;
    }
    res.ssr({
      title: 'Регистрация',
      layout: 'register',
      props: { email: emailToken.email },
    });
  });

  app.get('/auth/:token', async (req, res, next) => {
    const { token } = req.params;
    if (!token) {
      next();
      return;
    }
    const emailToken = await EmailToken.findOne({ token });
    if (!emailToken) {
      next();
      return;
    }
    res.ssr({
      title: 'Авторизация',
      layout: 'auth',
    });
  });

  app.all('/email-verification/:token', async (req, res, next) => {
    const { token } = req.params;
    if (!token) {
      next();
      return;
    }

    const emailToken = await EmailToken.findOne({ token });
    if (!emailToken) {
      next();
      return;
    }

    const hasUser = await User.findOne({ email: emailToken.email }).select('id');
    if (!hasUser) {
      res.redirect(`/signup/${token}`);
      return;
    }
    res.redirect(`/auth/${token}`);
  });

  app.post('/api/logout', (req, res, next) => {
    if (req.isAuthenticated()) {
      // io.emit(`profile:${req.user.username}`, { online: false });
      req.logOut();
      // req.session.destroy();
      res.status(200).json({ status: 'logout' });
      return;
    }
    next();
  });
};
