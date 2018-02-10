import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col, ControlLabel, HelpBlock } from 'react-bootstrap';

import LoginStore from './Login.store';
import Wrapper from '../../components/Wrapper';

import {
    Card,
    Input,
    Group,
    Submit,
    Recover,
    Help,
    Title,
} from './Auth.styled';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <Group controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <Input {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </Group>
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
                <Wrapper opaque>
                    <Grid>
                        <Row>
                            <Col mdOffset={4} md={4}>
                                <Card>
                                    <Title>Вход</Title>
                                    <Help>укажите свой электронный ящик</Help>
                                    <FieldGroup
                                        id="authEmail"
                                        type="email"
                                        name="email"
                                        label="Email"
                                        placeholder="Например: suzuki@chan.jp"
                                        value={this.store.email}
                                        onChange={e => this.store.handleChange('email', e.target.value)}
                                    />
                                    <Submit
                                        bsStyle="danger"
                                        bsSize="lg"
                                        disabled={!this.store.isValidEmail}
                                        onClick={this.store.handleSend}
                                        style={{ width: '40%' }}
                                    >
                                        Войти
                                    </Submit>
                                </Card>
                            </Col>
                        </Row>
                    </Grid>
                </Wrapper>
            );
        }
        return (
            <Wrapper opaque>
                <Grid>
                    <Row>
                        <Col mdOffset={4} md={4}>
                            <Card>
                                <Title>Подтверждение</Title>
                                <Help>проверьте ваш электронный ящик</Help>
                                
                                <p>
                                    Мы отправили вам письмо с подтверждением авторизации.
                                    Пожалуйста проверьте ваш электронный ящик.
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
            </Wrapper>
        );
    }
}
