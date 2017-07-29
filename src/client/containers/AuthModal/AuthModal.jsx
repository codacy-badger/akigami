import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

@observer
class AuthModal extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
    }
    componentWillUnmount() {
        this.props.store.removeListener();
    }
    renderNotLogged = () => {
        const { email, handleChange } = this.props.store;
        return (
            <div>
                <p>Введите свой электронный ящик, чтобы войти или зарегистрироваться</p>
                <Form>
                    <FieldGroup
                        id="authEmail"
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Например: suzuki@chan.jp"
                        value={email}
                        onChange={e => handleChange('email', e.target.value)}
                    />
                </Form>
            </div>
        );
    }
    renderConfirm() {
        const { authCode, handleChange } = this.props.store;
        return (
            <div>
                <p style={{ marginBottom: 0 }}>
                    Проверьте свой электронный ящик.
                    Вам пришло письмо с подтверждением авторизации.
                </p>
                <small style={{ display: 'inline-block', marginBottom: '1rem' }}>
                    Перейдите по ссылке в письме или введите код авторизации ниже.
                </small>
                <Form>
                    <FieldGroup
                        id="authCode"
                        type="text"
                        name="text"
                        label="Код авторизации"
                        placeholder="Например: a9b5d377-3849-459c-9767-89237d659de6"
                        value={authCode}
                        onChange={e => handleChange('authCode', e.target.value)}
                    />
                </Form>
            </div>
        );
    }
    renderRegister() {
        const { birthday, gender, email, username, handleChange } = this.props.store;
        return (
            <div>
                <p>Заполните информацию для аккаунта.</p>
                <Form>
                    <FieldGroup
                        id="email"
                        type="text"
                        name="text"
                        label="E-Mail"
                        value={email}
                        disabled
                    />
                    <FieldGroup
                        id="username"
                        type="text"
                        name="text"
                        label="Имя пользователя"
                        placeholder="Например: Joker"
                        value={username}
                        onChange={e => handleChange('username', e.target.value)}
                        help="Поле обязательно для заполнения"
                    />
                    <FormGroup controlId="gender">
                        <ControlLabel>Пол</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="Укажите ваш пол"
                            value={gender}
                            onChange={(e, data) => handleChange('gender', e.target.value)}
                        >
                            <option value="none">Не определился</option>
                            <option value="male">Мужской</option>
                            <option value="female">Женский</option>
                        </FormControl>
                    </FormGroup>
                    <FieldGroup
                        id="birthday"
                        type="date"
                        name="date"
                        label="День рождения"
                        placeholder="Например: 01.01.1995"
                        value={birthday}
                        onChange={e => handleChange('birthday', e.target.value)}
                    />
                </Form>
            </div>
        );
    }
    render() {
        const { step } = this.props.store;
        return (
            <div>
                {step === 'notLogged' && this.renderNotLogged()}
                {step === 'confirm' && this.renderConfirm()}
                {step === 'register' && this.renderRegister()}
            </div>
        );
    }
}

export default AuthModal;
