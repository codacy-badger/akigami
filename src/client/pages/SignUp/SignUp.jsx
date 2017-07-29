import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Grid from 'react-bootstrap/lib/Grid';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from 'react-bootstrap/lib/Form';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';

import SignUpStore from './SignUp.store';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}
@inject('app')
@observer
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.store = new SignUpStore(this.props.app);
    }
    render() {
        return (
            <Grid className={'opaque'}>
                <p>Заполните информацию для аккаунта.</p>
                <Form>
                    <FieldGroup
                        id="email"
                        type="text"
                        name="text"
                        label="E-Mail"
                        value={this.props.email}
                        disabled
                    />
                    <FieldGroup
                        id="username"
                        type="text"
                        name="text"
                        label="Имя пользователя"
                        placeholder="Например: Joker"
                        value={this.store.username}
                        onChange={e => this.store.handleChange('username', e.target.value)}
                        help="Поле обязательно для заполнения"
                    />
                    <FormGroup controlId="gender">
                        <ControlLabel>Пол</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="Укажите ваш пол"
                            value={this.store.gender}
                            onChange={(e, data) => this.store.handleChange('gender', e.target.value)}
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
                        value={this.store.birthday}
                        onChange={e => this.store.handleChange('birthday', e.target.value)}
                    />
                </Form>
                <Button
                    bsStyle="primary"
                    onClick={this.store.handleRegister}
                // disabled={!username && usernameError}
                >
                    Зарегистрироваться
            </Button>
            </Grid>
        );
    }
}