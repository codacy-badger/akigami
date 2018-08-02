import random from 'lodash/random';
import AvatarUploader from './AvatarUploader';

const user = () => ({
  avatar: `https://randomuser.me/api/portraits/men/${random(99)}.jpg`,
});

export default [
  {
    component: AvatarUploader,
    name: 'no avatar',
    props: {
      size: 100,
    },
  },
  {
    component: AvatarUploader,
    name: 'with avatar',
    props: {
      size: 100,
      avatar: user().avatar,
    },
  },
];
