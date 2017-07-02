import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Loader, Dimmer, Modal } from 'semantic-ui-react';

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
        const hasActive = modal.modals.some((i) => i.header.component);
        return (
            <span>
                <Dimmer active={hasActive} page>
                    <Loader />
                </Dimmer>
                {modal.modals.map((m) => {
                    if (!m.content.component) {
                        return false;
                    }
                    const { id, header, content, footer, className } = m;
                    return (
                        <Modal key={id} size={m.size} open className={className}>
                            {(header.title || header.component) && <Modal.Header className={header.className}>
                                {header.title ||
                                    React.createElement(header.component, {
                                        id,
                                        store: m.store,
                                        ...m.props,
                                    })
                                }
                            </Modal.Header>}
                            <Modal.Content className={content.className}>
                                {React.createElement(content.component, {
                                    id,
                                    store: m.store,
                                    ...m.props,
                                })}
                            </Modal.Content>
                            {footer.component && <Modal.Actions className={footer.className}>
                                {React.createElement(footer.component, {
                                    id,
                                    store: m.store,
                                    ...m.props,
                                })}
                            </Modal.Actions>}
                        </Modal>
                    );
                })}
            </span>
        );
    }
}
