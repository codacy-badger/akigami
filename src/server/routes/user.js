import mongoose from 'mongoose';

export default app => {
  app.get('/@:username/:tab?/:subTab?', async (req, res, next) => {
    const { username, tab, subTab } = req.params;
    const user = await mongoose
      .model('User')
      .findOne({ username });

    if (!user) {
      next();
      return;
    }

    res.ssr({
      title: user.displayName,
      layout: 'profile',
      props: {
        user,
        tab,
        subTab,
      },
    });
  });
};
