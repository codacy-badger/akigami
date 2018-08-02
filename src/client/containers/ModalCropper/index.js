import ModalCropper from './ModalCropper';
import Footer from './Footer';
import ModalCropperStore from './ModalCropper.store';

export default (image, data, callback) => ({
  header: {
    title: 'Редактирование',
  },
  content: {
    component: ModalCropper,
  },
  footer: {
    component: Footer,
  },
  store: new ModalCropperStore(image, callback),
  props: {
    image,
    data,
  },
});
