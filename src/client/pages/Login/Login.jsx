import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

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


FieldGroup.propTypes = {
    id: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    help: PropTypes.string,
};

FieldGroup.defaultProps = {
    help: null,
};

@inject('app')
@observer
export default class Login extends PureComponent {
    static propTypes = {
        app: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.store = new LoginStore(props.app);
    }
    componentWillUnmount() {
        this.store.removeListener();
    }
    render() {
        if (this.store.step === 'notLogged') {
            return (
                <Grid className="opaque">
                    <Row>
                        <Col mdOffset={4} md={4}>
                            <div className="auth-card">
                                <h1>Вход</h1>
                                <small>укажите свой электронный ящик</small>
                                <FieldGroup
                                    id="authEmail"
                                    type="email"
                                    name="email"
                                    label="Email"
                                    placeholder="Например: suzuki@chan.jp"
                                    value={this.store.email}
                                    onChange={e => this.store.handleChange('email', e.target.value)}
                                />
                                <Button
                                    className="auth-submit"
                                    bsStyle="danger"
                                    bsSize="lg"
                                    disabled={!this.store.isValidEmail}
                                    onClick={this.store.handleSend}
                                    style={{ width: '40%' }}
                                >
                                    Войти
                                </Button>
                                <a href="/recovery" className="auth-recovery">
                                    Забыли электронный ящик?
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            );
        }
        return (
            <Grid className="opaque">
                <Row>
                    <Col mdOffset={4} md={4}>
                        <div className="auth-card">
                            <h1>Подтверждение</h1>
                            <small>проверьте ваш электронный ящик</small>
                            
                            <p>
                                Мы отправили вам письмо с подтверждением авторизации.
                                Пожалуйста проверьте ваш электронный ящик.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
