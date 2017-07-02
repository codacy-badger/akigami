import Modal from './AuthModal';
import Header from './Header';
import Footer from './Footer';
import AuthModalStore from './AuthModal.store';

export default (params) => ({
    header: {
        component: Header,
        className: 'stepped-header',
    },
    content: {
        component: Modal,
    },
    footer: {
        component: Footer,
    },
    size: 'medium',
    store: new AuthModalStore(params),
});
