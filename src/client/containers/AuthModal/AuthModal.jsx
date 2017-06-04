import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input, Select } from 'semantic-ui-react';

const exampleRegisterCode = 'a9b5d377-3849-459c-9767-89237d659de6';
const exampleLoginCode = 'c427af39-8259-4d95-a79e-77610b797194';

const isCode = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class AuthModal extends PureComponent {
    static defaultProps = {
        step: 'notLogged',
        closable: true,
    }
    static propTypes = {
        onHide: PropTypes.func.isRequired,
        modal: PropTypes.bool.isRequired,
        step: PropTypes.oneOf(['notLogged', 'confirm', 'register']),
        closable: PropTypes.bool,
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
            usernameError: false,
            emailError: false,
            codeError: false,
            closable: props.closable || true,
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        const state = nextState;
        if (isCode.test(nextState.authCode)) {
            state.codeError = false;
            if (nextState.authCode === exampleLoginCode) {
                this.handleConfirm();
            }
            if (nextState.authCode === exampleRegisterCode) {
                state.step = 'register';
            }
        } else if (nextState.authCode.length === 0) {
            state.codeError = false;
        } else {
            state.codeError = true;
        }

        if (!isEmail.test(nextState.email)) {
            state.emailError = true;
        } else {
            state.emailError = false;
        }

        if (nextState.username.length > 3) {
            state.usernameError = false;
        } else {
            state.usernameError = true;
        }

        return state;
    }
    onChange = action => (e) => {
        this.setState({ [action]: e.target.value });
    }
    handleRegister = () => {
        const { usernameError } = this.state;
        if (!usernameError) {
            this.reset();
        }
    }
    handleConfirm = () => {
        alert('confirmed login!');
        this.reset();
    }
    handleAuth = () => {
        alert('auth!');
        const { emailError } = this.state;
        if (!emailError) {
            this.setState({
                step: 'confirm',
                closable: false,
            });
        }
    }
    reset = () => {
        this.props.onHide();
        this.setState({
            closable: true,
            step: 'notLogged',
            email: '',
            authCode: '',
            username: '',
            usernameError: false,
            emailError: false,
            gender: 'none',
            birthday: '',
        });
    }
    renderNotLogged() {
        const { email } = this.state;
        return (
            <Modal.Content>
                <Modal.Description>
                    <p>Введите свой электронный ящик, чтобы войти или зарегистрироваться</p>
                    <Form>
                        <Form.Field>
                            <label htmlFor="authEmail">Email</label>
                            <Input
                                type="email"
                                name="email"
                                id="authEmail"
                                placeholder="Например: suzuki@chan.jp"
                                value={email}
                                onChange={this.onChange('email')}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        );
    }
    renderConfirm() {
        const { authCode } = this.state;
        return (
            <Modal.Content>
                <Modal.Description>
                    <p style={{ marginBottom: 0 }}>
                        Проверьте свой электронный ящик.
                        Вам пришло письмо с подтверждением авторизации.
                    </p>
                    <small style={{ display: 'inline-block', marginBottom: '1rem' }}>
                        Перейдите по ссылке в письме или введите код авторизации ниже.
                    </small>
                    <Form>
                        <Form.Field>
                            <label htmlFor="authCode">Код авторизации</label>
                            <Input
                                type="text"
                                name="text"
                                id="authCode"
                                placeholder="Например: a9b5d377-3849-459c-9767-89237d659de6"
                                value={authCode}
                                onChange={this.onChange('authCode')}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        );
    }
    renderRegister() {
        const { birthday, gender, username } = this.state;
        return (
            <Modal.Content>
                <Modal.Description>
                    <p>Заполните информацию для аккаунта.</p>
                    <Form>
                        <Form.Field>
                            <label htmlFor="username">Имя пользователя</label>
                            <Input
                                label={{ icon: 'asterisk' }}
                                labelPosition="right corner"
                                type="text"
                                name="text"
                                id="username"
                                placeholder="Например: Joker"
                                value={username}
                                onChange={this.onChange('username')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="gender">Пол</label>
                            <Select
                                id="gender"
                                value={gender}
                                placeholder="Укажите ваш пол"
                                onChange={this.onChange('gender')}
                                options={[
                                    { key: 'none', value: 'none', text: 'Не определился' },
                                    { key: 'male', value: 'male', text: 'Мужской' },
                                    { key: 'female', value: 'female', text: 'Женский' },
                                ]}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="birthday">День рождения</label>
                            <Input
                                type="date"
                                name="date"
                                id="birthday"
                                placeholder="Например: 01.01.1995"
                                value={birthday}
                                onChange={this.onChange('birthday')}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        );
    }
    render() {
        const { step, closable, email, emailError, username, usernameError } = this.state;
        const { modal, onHide } = this.props;
        return (
            <Modal
                size="small"
                open={modal}
                onClose={closable && onHide}
                closeIcon={closable}
                closeOnDimmerClick={closable}
            >
                <Modal.Header>
                    {step === 'notLogged' && 'Вход / Регистрация'}
                    {step === 'confirm' && 'Подтверждение входа'}
                    {step === 'register' && 'Регистрация'}
                </Modal.Header>
                {step === 'notLogged' && this.renderNotLogged()}
                {step === 'confirm' && this.renderConfirm()}
                {step === 'register' && this.renderRegister()}
                <Modal.Actions style={{ textAlign: 'center' }}>
                    {step === 'notLogged' && (
                        <div>
                            <Button
                                inverted
                                basic
                                color="grey"
                                onClick={onHide}
                            >
                                Закрыть
                            </Button>
                            <Button
                                inverted
                                color="red"
                                disabled={!isEmail.test(email) && emailError}
                                onClick={this.handleAuth}
                                style={{ width: '30%' }}
                            >
                                Войти
                            </Button>
                        </div>
                    )}
                    {step === 'confirm' && (
                        <Button
                            inverted
                            basic
                            color="grey"
                            onClick={this.reset}
                        >
                            Отменить авторизацию
                        </Button>
                    )}
                    {step === 'register' && (
                        <div>
                            <Button
                                inverted
                                basic
                                color="grey"
                                onClick={this.reset}
                            >
                                Отменить
                            </Button>
                            <Button
                                inverted
                                color="red"
                                onClick={this.handleRegister}
                                disabled={!username && usernameError}
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                    )}
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AuthModal;
