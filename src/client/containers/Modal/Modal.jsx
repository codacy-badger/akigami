import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import cx from 'classnames';

import Icon from '../../components/Icon';

@inject('app')
@observer
export default class ModalComponent extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };
  render() {
    const { modal } = this.props.app;
    if (modal.modals.length === 0) {
      return false;
    }
    return (
      <span>
        {modal.modals.map(m => {
          if (!m.content.component) {
            return false;
          }
          const { id, show, header, content, footer, className, isOverlay } = m;
          const handleCloseModal = () => modal.close(id);
          console.log('m', m);
          return (
            <ReactModal
              key={id}
              isOpen={show}
              onRequestClose={handleCloseModal}
              closeTimeoutMS={300}
              className={{
                base: `akg-modal ${isOverlay ? 'akg-noShadow' : ''}`,
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
              <div className="akg-modal-inner">
                {!isOverlay && <div className="akg-modal-bitmap-2" />}
                {!isOverlay && <div className="akg-modal-bitmap-1" />}
                <div
                  className={cx({
                    'akg-modal-content': !isOverlay,
                    'akg-modal-overlay': isOverlay,
                  })}
                >
                  <button
                    type="button"
                    className="akg-modal-button"
                    onClick={handleCloseModal}
                  >
                    <Icon type="close" />
                  </button>
                  {React.createElement(content.component, {
                    id,
                    closeModal: handleCloseModal,
                    store: m.store,
                    ...m.props,
                  })}
                  {footer.component &&
                    React.createElement(footer.component, {
                      id,
                      closeModal: handleCloseModal,
                      store: m.store,
                      ...m.props,
                    })}
                </div>
              </div>
            </ReactModal>
          );
        })}
      </span>
    );
  }
}
