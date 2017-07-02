import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select } from 'semantic-ui-react';

@observer
class AuthModal extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
    }
    renderNotLogged = () => {
        const { email, handleChange } = this.props.store;
        return (
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
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </Form.Field>
                </Form>
            </Modal.Description>
        );
    }
    renderConfirm() {
        const { authCode, handleChange } = this.props.store;
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
                                onChange={(e) => handleChange('authCode', e.target.value)}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        );
    }
    renderRegister() {
        const { birthday, gender, username, handleChange } = this.props.store;
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
                                onChange={(e) => handleChange('username', e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="gender">Пол</label>
                            <Select
                                id="gender"
                                value={gender}
                                placeholder="Укажите ваш пол"
                                onChange={(e, data) => handleChange('gender', data.value)}
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
                                onChange={(e) => handleChange('birthday', e.target.value)}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        );
    }
    render() {
        const { step } = this.props.store;
        return (<div>
            {step === 'notLogged' && this.renderNotLogged()}
            {step === 'confirm' && this.renderConfirm()}
            {step === 'register' && this.renderRegister()}
        </div>);
    }
}

export default AuthModal;
