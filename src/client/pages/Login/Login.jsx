import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';

import Grid from 'react-bootstrap/lib/Grid';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from 'react-bootstrap/lib/Form';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';

import LoginStore from './Login.store';

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
export default class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.store = new LoginStore(this.props.app);
    }
    componentWillUnmount() {
        this.store.removeListener();
    }
    render() {
        if (this.store.step === 'notLogged') {
            return (
                <Grid className="opaque">
                    <p>Введите свой электронный ящик, чтобы войти или зарегистрироваться</p>
                    <Form>
                        <FieldGroup
                            id="authEmail"
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="Например: suzuki@chan.jp"
                            value={this.store.email}
                            onChange={e => this.store.handleChange('email', e.target.value)}
                        />
                    </Form>
                    <Button
                        bsStyle="primary"
                        disabled={!this.store.isValidEmail}
                        onClick={this.store.handleSend}
                        style={{ width: '30%' }}
                    >
                    Войти
                    </Button>
                </Grid>
            );
        } 
        return (
            <Grid className={'opaque'}>
                <p style={{ marginBottom: 0 }}>
                    Проверьте свой электронный ящик.
                    Вам пришло письмо с подтверждением авторизации.
                </p>
            </Grid>
        );
    }
}