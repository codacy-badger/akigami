import random from 'lodash/random';
import Avatar from './Avatar';

const user = () => ({
  avatar: `https://randomuser.me/api/portraits/men/${random(99)}.jpg`,
});

export default [
  {
    component: Avatar,
    name: 'small',
    props: {
      src: user().avatar,
      size: 24,
    },
  },
  {
    component: Avatar,
    name: 'normal',
    props: {
      src: user().avatar,
      size: 40,
    },
  },
  {
    component: Avatar,
    name: 'large',
    props: {
      src: user().avatar,
      size: 100,
    },
  },
];
