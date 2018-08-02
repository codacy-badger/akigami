export default app => {
  app.get('/explore/:type(anime|manga|novel)?', ({ params: { type } }, res) => {
    let title = 'Обзор аниме';
    if (type === 'manga') title = 'Обзор манги';
    if (type === 'novel') title = 'Обзор новелл';
    res.ssr({
      title,
      layout: 'explore',
      props: {
        type,
      },
    });
  });
};
