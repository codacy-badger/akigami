import Block from './Block';

export default [
  {
    component: Block,
    name: 'no title',
    props: {
      children: 'lorem ipsum',
    },
  },
  {
    component: Block,
    name: 'with title',
    props: {
      title: 'Заголовок',
      children: 'lorem ipsum',
    },
  },
  {
    component: Block,
    name: 'bordered',
    props: {
      bordered: true,
      title: 'Заголовок',
      children: 'lorem ipsum',
    },
  },
  {
    component: Block,
    name: 'bordered & padded',
    props: {
      padded: true,
      bordered: true,
      title: 'Заголовок',
      children: 'lorem ipsum',
    },
  },
  {
    component: Block,
    name: 'colored & padded',
    props: {
      padded: true,
      colored: true,
      title: 'Заголовок',
      children: 'lorem ipsum',
    },
  },
  {
    component: Block,
    name: 'colored & padded & shadow',
    props: {
      padded: true,
      colored: true,
      shadow: true,
      title: 'Заголовок',
      children: 'lorem ipsum',
    },
  },
];
