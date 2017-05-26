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
    FormFeedback,
    FormText,
} from 'reactstrap';

const exampleRegisterCode = 'a9b5d377-3849-459c-9767-89237d659de6';
const exampleLoginCode = 'c427af39-8259-4d95-a79e-77610b797194';

const isCode = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class AuthModal extends PureComponent {
    static defaultProps = {
        step: null,
        backdrop: null,
    }
    static propTypes = {
        onHide: PropTypes.func.isRequired,
        modal: PropTypes.bool.isRequired,
        step: PropTypes.oneOf(['notLogged', 'confirm', 'register']),
        backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
    }
    constructor(props) {
        super(props);
        this.state = {
            step: props.step || 'notLogged',
            email: '',
            authCode: '',
            username: '',
            birthday: '',
            gender: 'none',
            usernameStatus: null,
            emailStatus: null,
            codeStatus: null,
            backdrop: props.backdrop || true,
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        const state = nextState;
        if (isCode.test(nextState.authCode)) {
            state.codeStatus = null;
            if (nextState.authCode === exampleLoginCode) {
                this.handleConfirm();
            }
            if (nextState.authCode === exampleRegisterCode) {
                state.step = 'register';
            }
        } else if (nextState.authCode.length === 0) {
            state.codeStatus = null;
        } else {
            state.codeStatus = 'danger';
        }

        if (isEmail.test(nextState.email)) {
            state.emailStatus = 'success';
        } else {
            state.emailStatus = null;
        }

        if (nextState.username.length > 3) {
            state.usernameStatus = 'success';
        } else {
            state.usernameStatus = null;
        }

        return state;
    }
    onChange = action => (e) => {
        this.setState({ [action]: e.target.value });
    }
    handleRegister = () => {
        const { usernameStatus } = this.state;
        if (usernameStatus) {
            this.reset();
        }
    }
    handleConfirm = () => {
        alert('confirmed login!');
        this.reset();
    }
    handleAuth = () => {
        alert('auth!');
        const { emailStatus } = this.state;
        if (emailStatus) {
            this.setState({
                step: 'confirm',
                backdrop: 'static',
            });
        }
    }
    reset = () => {
        this.props.onHide();
        this.setState({
            backdrop: true,
            step: 'notLogged',
            email: '',
            authCode: '',
            username: '',
            usernameStatus: null,
            emailStatus: null,
            gender: 'none',
            birthday: '',
        });
    }
    renderNotLogged() {
        const { email, emailStatus } = this.state;
        const { onHide } = this.state;
        return (
            <div>
                <ModalHeader toggle={this.toggle} style={{ justifyContent: 'center' }}>
                    Вход / Регистрация
                </ModalHeader>
                <ModalBody>
                    <p>Введите свой электронный ящик, чтобы войти или зарегистрироваться</p>
                    <FormGroup color={emailStatus}>
                        <Label for="authEmail">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="authEmail"
                            value={email}
                            state={emailStatus}
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
                        disabled={!emailStatus}
                    >
                        Войти
                    </Button>
                </ModalFooter>
            </div>
        );
    }
    renderConfirm() {
        const { authCode, codeStatus } = this.state;
        return (
            <div>
                <ModalHeader style={{ justifyContent: 'center' }}>
                    Подтверждение входа
                </ModalHeader>
                <ModalBody>
                    <p style={{ marginBottom: 0 }}>
                        Проверьте свой электронный ящик. Вам пришло письмо с подтверждением авторизации.
                    </p>
                    <small style={{ display: 'inline-block', marginBottom: '1rem' }}>
                        Перейдите по ссылке в письме или введите код авторизации ниже.
                    </small>
                    <FormGroup color={codeStatus}>
                        <Label for="authCode">Код авторизации</Label>
                        <Input
                            type="text"
                            name="text"
                            id="authCode"
                            value={authCode}
                            state={codeStatus}
                            onChange={this.onChange('authCode')}
                            placeholder="Например: c427af39-8259-4d95-a79e-77610b797194"
                        />
                        {codeStatus === 'danger' && (
                            <FormFeedback>Вы ввеели не код подтверждения</FormFeedback>
                        )}
                    </FormGroup>
                </ModalBody>
                <ModalFooter style={{ justifyContent: 'center' }}>
                    <Button color="link" onClick={this.reset}>Отменить авторизацию</Button>
                </ModalFooter>
            </div>
        );
    }
    renderRegister() {
        const { birthday, gender, username, usernameStatus } = this.state;
        return (
            <div>
                <ModalHeader style={{ justifyContent: 'center' }}>
                    Регистрация
                </ModalHeader>
                <ModalBody>
                    <p>Заполните информацию для аккаунта.</p>
                    <FormGroup color={usernameStatus}>
                        <Label for="username">Имя пользователя</Label>
                        <Input
                            type="text"
                            name="text"
                            id="username"
                            value={username}
                            state={usernameStatus}
                            onChange={this.onChange('username')}
                            placeholder="Например: Joker"
                        />
                        {usernameStatus === 'danger' && (
                            <FormFeedback>Это поле не может быть пустым</FormFeedback>
                        )}
                        <FormText color="muted">* поле обязательно для заполнения</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="gender">Пол</Label>
                        <Input
                            type="select"
                            name="select"
                            id="gender"
                            value={gender}
                            onChange={this.onChange('gender')}
                        >
                            <option value="none">Не определился</option>
                            <option value="male">Мужской</option>
                            <option value="female">Женский</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="birthday">День рождения</Label>
                        <Input
                            type="date"
                            name="date"
                            id="birthday"
                            value={birthday}
                            onChange={this.onChange('birthday')}
                            placeholder="Например: 01.01.1995"
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter style={{ justifyContent: 'center' }}>
                    <Button color="link" onClick={this.reset}>Отменить</Button>
                    <Button
                        color="success"
                        onClick={this.handleRegister}
                        disabled={!usernameStatus}
                    >
                        Зарегистрироваться
                    </Button>
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
                {step === 'register' && this.renderRegister()}
            </Modal>
        );
    }
}

export default AuthModal;
