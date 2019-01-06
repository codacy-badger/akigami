import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.use((req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    const err = new Error('Not found');
    err.status = 404;
    throw err;
  }
});


router.get('/', (req, res) => {
  res.ssr({
    title: 'Админ панель',
    layout: 'admin',
    props: {
      activeTab: 'dashboard',
    },
  });
});

router.get('/genres', async (req, res) => {
  const genres = await mongoose
    .model('Genre')
    .find({})
    .sort({ id: -1 });

  res.ssr({
    title: 'Список жанров',
    layout: 'admin:genres',
    props: {
      genres,
      activeTab: 'genres',
    },
  });
});

export default app => {
  app.use('/admin', router);
};
