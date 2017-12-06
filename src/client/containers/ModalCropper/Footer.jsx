import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Button from 'react-bootstrap/lib/Button';

import { Actions } from './ModalCropper.styled';

@inject('app')
@observer
class Footer extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        app: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
    }
    handleClose = () => {
        const { id, app } = this.props;
        app.modal.close(id);
    }
    render() {
        const { store } = this.props;
        return (
            <Actions>
                <Button
                    onClick={this.handleClose}
                >
                    Отменить
                </Button>
                <Button
                    bsStyle="success"
                    onClick={store.ok}
                    disabled={store.loading}
                >
                    {!store.loading
                        ? 'Загрузить'
                        : 'Загрузка'
                    }
                </Button>
            </Actions>
        );
    }
}

export default Footer;
