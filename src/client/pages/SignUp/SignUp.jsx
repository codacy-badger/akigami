import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';

import SignUpStore from './SignUp.store';
import AvatarUploader from '../../components/AvatarUploader';
import GenderChanger from '../../components/GenderChanger';

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
export default class Login extends Component {
    static propTypes = {
        app: PropTypes.object.isRequired,
        email: PropTypes.string.isRequired,
    }
    constructor(props) {
        super(props);
        this.store = new SignUpStore(this.props.app);
    }
    render() {
        return (
            <Grid className="opaque">
                <Row>
                    <Col mdOffset={4} md={4}>
                        <div className="auth-card">
                            <h1>Регистрация</h1>
                            <small>давайте создадим ваш аккаунт</small>

                            <AvatarUploader size={100} />
                            <GenderChanger
                                selected={this.store.gender}
                                onSelect={e => this.store.handleChange('gender', e)}
                            />

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
                            <FormGroup controlId="birthday">
                                <ControlLabel>День рождения</ControlLabel>
                                <Datetime
                                    locale="ru"
                                    dateFormat="LL"
                                    timeFormat={false}
                                    placeholder="Например 01.01.1995"
                                    value={this.store.birthday}
                                    onChange={e => this.store.handleChange('birthday', e._d)}
                                />
                            </FormGroup>
                            <Button
                                className="auth-submit"
                                bsStyle="danger"
                                bsSize="lg"
                                onClick={this.store.handleRegister}
                            >
                                Создать аккаунт
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}