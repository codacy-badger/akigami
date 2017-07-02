import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/lib/Modal';

@inject('app')
@observer
export default class ModalComponent extends PureComponent {
    static propTypes = {
        app: PropTypes.object.isRequired,
    }
    render() {
        const { modal } = this.props.app;
        if (modal.modals.length === 0) {
            return false;
        }
        return (
            <span>
                {modal.modals.map((m) => {
                    if (!m.content.component) {
                        return false;
                    }
                    const { id, header, content, footer, className } = m;
                    console.log('m', m);
                    return (
                        <Modal key={id} bsSize={m.size} show className={className}>
                            {(header.title || header.component) && (
                                <Modal.Header closeButton className={header.className}>
                                    {header.title ||
                                        React.createElement(header.component, {
                                            id,
                                            store: m.store,
                                            ...m.props,
                                        })
                                    }
                                </Modal.Header>
                            )}
                            <Modal.Body className={content.className}>
                                {React.createElement(content.component, {
                                    id,
                                    store: m.store,
                                    ...m.props,
                                })}
                            </Modal.Body>
                            {footer.component && (
                                <Modal.Footer className={footer.className}>
                                    {React.createElement(footer.component, {
                                        id,
                                        store: m.store,
                                        ...m.props,
                                    })}
                                </Modal.Footer>
                            )}
                        </Modal>
                    );
                })}
            </span>
        );
    }
}
