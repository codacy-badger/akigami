import capitalize from 'lodash/capitalize';

export default app => {
  app.get('/explore/:type(anime|manga|novel)/create', ({ params: { type } }, res) => {
    let title = 'Добавить новое аниме';
    if (type === 'manga') title = 'Добавить новую мангу';
    if (type === 'novel') title = 'Добавить новую новеллу';
    const layout = `add${capitalize(type)}Entity`;
    res.ssr({
      title,
      layout,
      props: {
        type,
      },
    });
  });
};
