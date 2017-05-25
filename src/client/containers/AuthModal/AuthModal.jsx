import React, { PureComponent } from 'react';
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

class AuthModal extends PureComponent {
    state = {
        email: '',
    };
    handleAuth = () => {
        alert('auth!');
        this.props.onHide();
    }
    changeEmail = (e) => {
        this.setState({ email: e.target.value });
    }
    render() {
        const { email } = this.state;
        const { modal, onHide } = this.props;
        return (
            <Modal isOpen={modal} toggle={onHide}>
                <ModalHeader toggle={this.toggle} style={{ justifyContent: 'center' }}>
                    Авторизация
                </ModalHeader>
                <ModalBody>
                    <p>Введите свой электронный ящик, чтобы войти или зарегистрироваться</p>
                    <FormGroup>
                        <Label for="authEmail">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="authEmail"
                            value={email}
                            onChange={this.changeEmail}
                            placeholder="Например: suzuki@chan.jp"
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter style={{ justifyContent: 'center' }}>
                    <Button color="link" onClick={onHide}>Закрыть</Button>
                    <Button
                        color="danger"
                        onClick={this.handleAuth}
                        style={{ width: '40%' }}
                    >
                        Войти
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default AuthModal;
