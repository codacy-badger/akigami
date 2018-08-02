export default app => {
  app.get('/:type(anime|manga|novel)/:id', ({ params: { type, id } }, res) => {
    res.ssr({
      title: 'Test entity',
      layout: 'entity',
      props: {
        id,
        type,
      },
    });
  });
};
