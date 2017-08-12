import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import Datetime from 'react-datetime';

import AvatarUploader from '../../components/AvatarUploader';
import GenderChanger from '../../components/GenderChanger';
import Block from '../../components/Block';

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

@inject(s => ({
    ui: s.app.ui,
    user: s.app.user,
}))
@observer
class Settings extends PureComponent {
    componentDidMount() {
        this.props.ui.changeTransparented(true);
    }
    componentWillUnmount() {
        this.props.ui.changeTransparented(false);
    }
    render() {
        const { user } = this.props;
        return (
            <div className="transparented">
                <div className="default-header">
                    <Grid className="content">
                        <Row>
                            <Col xs={12}>
                                <h1 style={{ margin: '0 0 32px' }}>Настройки профиля</h1>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <Grid className="content">
                    <Row>
                        <Col md={6}>
                            <Block title="Сменить аватар">
                                <AvatarUploader
                                    size={120}
                                    avatar={user.getAvatar}
                                />
                            </Block>
                        </Col>
                        <Col md={6}>
                            <Block title="Сменить обложку">
                                Здесь будет аплоадер
                            </Block>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Block title="Настройка аккаунта">
                                <FieldGroup
                                    id="authEmail"
                                    type="email"
                                    name="email"
                                    label="Email"
                                    placeholder="Например: suzuki@chan.jp"
                                    value={user.email || ''}
                                />
                                <FieldGroup
                                    id="displayName"
                                    type="text"
                                    name="text"
                                    label="Имя пользователя"
                                    placeholder="Например: Joker"
                                    value={user.displayName || ''}
                                />
                                <FormGroup controlId="birthday">
                                    <ControlLabel>День рождения</ControlLabel>
                                    <Datetime
                                        locale="ru"
                                        dateFormat="LL"
                                        timeFormat={false}
                                        placeholder="Например 01.01.1995"
                                        value={user.birthday || ''}
                                    />
                                </FormGroup>
                                <FormGroup controlId="gender">
                                    <ControlLabel>Пол</ControlLabel>
                                    <GenderChanger
                                        style={{
                                            justifyContent: 'flex-start',
                                        }}
                                        selected={user.gender || 'none'}
                                    />
                                </FormGroup>
                            </Block>
                        </Col>
                        <Col md={6}>
                            <Block title="Настройка сайта">
                                Здесь будут настройки сайта
                            </Block>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} style={{ textAlign: 'center' }}>
                            <Button bsStyle="danger">
                                Сохранить настройки
                            </Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Settings;
