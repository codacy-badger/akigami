import Modal from './ModalNotFound';
import Footer from './Footer';

export default () => ({
    header: {
        title: 'Ошибка',
    },
    content: {
        component: Modal,
    },
    footer: {
        component: Footer,
    },
    size: 'small',
});
