import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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

const exampleCode = 'c427af39-8259-4d95-a79e-77610b797194';

class AuthModal extends PureComponent {
    static propTypes = {
        onHide: PropTypes.func.isRequired,
        modal: PropTypes.bool.isRequired,
    }
    state = {
        step: 'notLogged',
        email: '',
        authCode: '',
        backdrop: true,
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.authCode === exampleCode) {
            return this.handleConfirm();
        }
        return true;
    }
    onChange = action => (e) => {
        this.setState({ [action]: e.target.value });
    }
    handleConfirm = () => {
        alert('confirmed!');
        this.reset();
    }
    handleAuth = () => {
        alert('auth!');
        this.setState({
            step: 'confirm',
            backdrop: 'static',
        });
    }
    reset = () => {
        this.props.onHide();
        this.setState({
            backdrop: true,
            step: 'notLogged',
            email: '',
            authCode: '',
        });
    }
    renderNotLogged() {
        const { email } = this.state;
        const { onHide } = this.state;
        return (
            <div>
                <ModalHeader toggle={this.toggle} style={{ justifyContent: 'center' }}>
                    Вход / Регистрация
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
                            onChange={this.onChange('email')}
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
            </div>
        );
    }
    renderConfirm() {
        const { authCode } = this.state;
        return (
            <div>
                <ModalHeader style={{ justifyContent: 'center' }}>
                    Подтверждение входа
                </ModalHeader>
                <ModalBody>
                    <p style={{ marginBottom: 0 }}>
                        Проверьте свой электронный ящик. Вам пришло письмо с подтверждением авторизации.
                    </p>
                    <small style={{ display: 'inline-block', marginBottom: 0 }}>
                        Перейдите по ссылке в письме или введите код авторизации ниже.
                    </small>
                    <FormGroup>
                        <Label for="authEmail">Код авторизации</Label>
                        <Input
                            type="email"
                            name="email"
                            id="authEmail"
                            value={authCode}
                            onChange={this.onChange('authCode')}
                            placeholder="Например: c427af39-8259-4d95-a79e-77610b797194"
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter style={{ justifyContent: 'center' }}>
                    <Button color="link" onClick={this.reset}>Отменить авторизацию</Button>
                </ModalFooter>
            </div>
        );
    }
    render() {
        const { step, backdrop } = this.state;
        const { modal, onHide } = this.props;
        const isToggle = backdrop !== 'static';
        return (
            <Modal
                modalClassName="centered"
                isOpen={modal}
                toggle={isToggle && onHide}
                backdrop={backdrop}
            >
                {step === 'notLogged' && this.renderNotLogged()}
                {step === 'confirm' && this.renderConfirm()}
            </Modal>
        );
    }
}

export default AuthModal;
