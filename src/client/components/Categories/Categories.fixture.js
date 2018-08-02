import Categories from './Categories';

export default {
  component: Categories,
  props: {
    items: [
      { id: 1, active: true, icon: 'account-multiple', title: 'Пользователи' },
      { id: 2, active: false, icon: 'book-variant', title: 'Закладки' },
      { id: 3, active: false, icon: 'cupcake', title: 'Маффины' },
    ],
    onSelect: item => console.log('Select', item),
  },
};
