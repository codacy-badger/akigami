import mongoose from 'mongoose';
import debugNamespace from 'debug';

const debug = debugNamespace('akigami:server:router:studios');

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
      props: {
        type: 'create',
      },
    });
  });

  app.get('/studios/:id', async (req, res) => {
    const { id } = req.params;
    const studio = await mongoose
      .model('Studio')
      .findOne({ id });
    debug(studio);
    if (studio) {
      res.ssr({
        title: `${studio.title} | Студия`,
        layout: 'studio',
        props: {
          studio,
        },
      });
      return;
    }
    throw new Error({ status: 404 });
  });

  app.get('/studios/:id/edit', async (req, res) => {
    const { id } = req.params;
    const studio = await mongoose
      .model('Studio')
      .findOne({ id });
    debug(studio);
    if (studio) {
      res.ssr({
        title: `Редактирование ${studio.title}`,
        layout: 'addStudio',
        props: {
          type: 'edit',
          studio,
        },
      });
      return;
    }
    throw new Error({ status: 404 });
  });
};
