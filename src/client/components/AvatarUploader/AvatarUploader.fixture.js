import AvatarUploader from './AvatarUploader';

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
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
];
