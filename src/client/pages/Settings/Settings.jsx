import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Row, Col, FormControl, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
// import Datetime from 'react-datetime';

import Field from '../../components/Field';
// import AvatarUploader from '../../components/AvatarUploader';
// import GenderChanger from '../../components/GenderChanger';
import Block from '../../components/Block';
import Wrapper from '../../components/Wrapper';
import Content from '../../components/Content';
import Red from '../../components/Red';
import Store from './Settings.store';

@inject(s => ({
    user: s.app.user,
    notification: s.app.notification,
}))
@observer
class Settings extends Component {
    static propTypes = {
        // user: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.store = new Store(props);
    }
    state = {
        emailEdit: false,
    }
    render() {
        const { emailEdit } = this.state;
        // const { user } = this.props;
        const {
            displayName,
            displayNameEdit,
            username,
            usernameEdit,
            usernameValidate,
        } = this.store.viewModel;
        return (
            <Wrapper opaque>
                <Red>
                    <Content>
                        <Row>
                            <Col xs={12}>
                                <h1
                                    style={{
                                        margin: '0 0 32px',
                                        fontWeight: 800,
                                    }}
                                >
                                    Настройки
                                </h1>
                            </Col>
                        </Row>
                    </Content>
                </Red>
                <Content>
                    <Row>
                        <Col xs={12} md={6}>
                            <Block
                                title="Email и уведомления"
                                bordered
                                padded
                                colored
                            >
                                <Field
                                    title="Ваш Email"
                                    actions={(
                                        <div>
                                            {emailEdit ? (
                                                <ButtonToolbar>
                                                    <Button
                                                        bsStyle="success"
                                                        onClick={() => {
                                                            this.setState({ emailEdit: false });
                                                        }}
                                                    >
                                                        Сохранить
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            this.setState({ emailEdit: false });
                                                        }}
                                                    >
                                                        Отмена
                                                    </Button>
                                                </ButtonToolbar>
                                            ) : (
                                                <Button
                                                    onClick={() => {
                                                        this.setState({ emailEdit: true });
                                                    }}
                                                >
                                                    Изменить почту
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                >
                                    <FormControl
                                        bsSize="small"
                                        type="text"
                                        disabled={!emailEdit}
                                    />
                                </Field>
                                <Field
                                    title="Упоминания"
                                    description="Получать уведомления на электронную почту, когда кто-либо упоминает вас где-либо."
                                    actions={(
                                        <ButtonGroup>
                                            <Button bsStyle="success">Вкл.</Button>
                                            <Button>Выкл.</Button>
                                        </ButtonGroup>
                                    )}
                                />
                            </Block>
                        </Col>
                        <Col xs={12} md={6}>
                            <Block
                                title="Аккаунт"
                                bordered
                                padded
                                colored
                            >
                                <Field
                                    title="Юзернейм"
                                    description="Виден в адресной строке вашего профиля."
                                    actions={(
                                        <div>
                                            {usernameEdit ? (
                                                <ButtonToolbar>
                                                    <Button
                                                        bsStyle="success"
                                                        onClick={() => {
                                                            this.store.handleSave('username');
                                                        }}
                                                        disabled={!usernameValidate}
                                                    >
                                                        Сохранить
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            this.store.enableEdit('username', false);
                                                        }}
                                                    >
                                                        Отмена
                                                    </Button>
                                                </ButtonToolbar>
                                            ) : (
                                                <Button onClick={() => this.store.enableEdit('username', true)}>Изменить юзернейм</Button>
                                            )}
                                        </div>
                                    )}
                                >
                                    <FormControl
                                        value={username}
                                        bsSize="small"
                                        type="text"
                                        onChange={(e) => {
                                            this.store.handleChange('username', e.target.value);
                                        }}
                                        disabled={!usernameEdit}
                                    />
                                </Field>
                                <Field
                                    title="Имя пользователя"
                                    description="Будет видно всем пользователям в ваших постах/комментариях/рецензиях."
                                    actions={(
                                        <div>
                                            {displayNameEdit ? (
                                                <ButtonToolbar>
                                                    <Button
                                                        bsStyle="success"
                                                        onClick={() => {
                                                            this.store.handleSave('displayName');
                                                        }}
                                                    >
                                                        Сохранить
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            this.store.enableEdit('displayName', false);
                                                        }}
                                                    >
                                                        Отмена
                                                    </Button>
                                                </ButtonToolbar>
                                            ) : (
                                                <Button
                                                    onClick={() => {
                                                        this.store.enableEdit('displayName', true);
                                                    }}
                                                >
                                                    Изменить имя
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                >
                                    <FormControl
                                        value={displayName}
                                        bsSize="small"
                                        type="text"
                                        onChange={(e) => {
                                            this.store.handleChange('displayName', e.target.value);
                                        }}
                                        disabled={!displayNameEdit}
                                    />
                                </Field>
                            </Block>
                        </Col>
                    </Row>
                </Content>
            </Wrapper>
        );
    }
}

export default Settings;
