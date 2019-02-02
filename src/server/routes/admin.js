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

router.get('/users', async (req, res) => {
  const users = await mongoose
    .model('User')
    .find({})
    .sort({ id: -1 });

  res.ssr({
    title: 'Список пользователей',
    layout: 'admin:users',
    props: {
      users,
      activeTab: 'users',
    },
  });
});

export default app => {
  app.use('/admin', router);
};
