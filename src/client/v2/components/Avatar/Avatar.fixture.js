import Avatar from './Avatar';

export default [
  {
    component: Avatar,
    name: 'small',
    props: {
      src: 'https://randomuser.me/api/portraits/men/1.jpg',
      size: 24,
    },
  },
  {
    component: Avatar,
    name: 'normal',
    props: {
      src: 'https://randomuser.me/api/portraits/men/1.jpg',
      size: 40,
    },
  },
  {
    component: Avatar,
    name: 'large',
    props: {
      src: 'https://randomuser.me/api/portraits/men/1.jpg',
      size: 100,
    },
  },
];
