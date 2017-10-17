import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import { Poster, ModalContent } from './EntityModal.styled';

class EntityModal extends PureComponent {
    constructor() {
        super();
        this.state = {
            showModal: false,
        };
    }
    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }
    render() {
        const { showModal } = this.state;
        const { type, id } = this.props;
        return (
            <div>
                <button onClick={this.handleOpenModal}>Trigger Modal</button>
                <ReactModal
                    isOpen={showModal}
                    contentLabel={`${type}-${id}`}
                    onRequestClose={this.handleCloseModal}
                    className={{
                        base: 'akg-modal',
                        afterOpen: 'akg-modal-open',
                        beforeClose: 'akg-modal-close',
                    }}
                    overlayClassName={{
                        base: 'akg-overlay',
                        afterOpen: 'akg-overlay-open',
                        beforeClose: 'akg-overlay-close',
                    }}
                    bodyOpenClassName="akg-strict"
                >
                    <ModalContent>
                        <Poster src="https://kawai.shikimori.org/system/animes/original/34636.jpg" />
                        <div>sample text</div>
                    </ModalContent>
                </ReactModal>
            </div>
        );
    }
}

export default EntityModal;
