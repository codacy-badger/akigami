import mongoose from 'mongoose';

export default app => {
  app.get('/studios', async (req, res) => {
    const studios = await mongoose
      .model('Studio')
      .find({})
      .sort({ id: -1 });

    res.ssr({
      title: 'Студии',
      layout: 'studios',
      props: {
        studios,
      },
    });
  });

  app.get('/studios/create', async (req, res) => {
    res.ssr({
      title: 'Добавить новую студию',
      layout: 'addStudio',
    });
  });
};
