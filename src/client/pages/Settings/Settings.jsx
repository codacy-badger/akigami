import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormControl, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import Datetime from 'react-datetime';

import Field from '../../components/Field';
import AvatarUploader from '../../components/AvatarUploader';
import GenderChanger from '../../components/GenderChanger';
import Block from '../../components/Block';
import Wrapper from '../../components/Wrapper';
import Content from '../../components/Content';
import Red from '../../components/Red';

@inject(s => ({
    user: s.app.user,
}))
@observer
class Settings extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    }
    state = {
        emailEdit: false,
        usernameEdit: false,
        displayNameEdit: false,
    }
    render() {
        const { emailEdit, usernameEdit, displayNameEdit } = this.state;
        const { user } = this.props;
        console.log(user);
        return (
            <Wrapper opaque>
                <Red>
                    <Content>
                        <Row>
                            <Col xs={12}>
                                <h1 style={{ margin: '0 0 32px', fontWeight: 800 }}>Настройки</h1>
                            </Col>
                        </Row>
                    </Content>
                </Red>
                <Content>
                    <Row>
                        <Col xs={12} md={6}>
                            <Block title="Email и уведомления" bordered>
                                <Field
                                    title="Ваш Email"
                                    actions={(
                                        <div>
                                            {emailEdit ? (
                                                <ButtonToolbar>
                                                    <Button bsStyle="success" onClick={() => this.setState({ emailEdit: false })}>Сохранить</Button>
                                                    <Button onClick={() => this.setState({ emailEdit: false })}>Отмена</Button>
                                                </ButtonToolbar>
                                            ) : (
                                                <Button onClick={() => this.setState({ emailEdit: true })}>Изменить почту</Button>
                                            )}
                                        </div>
                                    )}
                                >
                                    <FormControl bsSize="small" type="text" disabled={!emailEdit} />
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
                            <Block title="Аккаунт" bordered>
                                <Field
                                    title="Юзернейм"
                                    description="Виден в адресной строке вашего профиля."
                                    actions={(
                                        <div>
                                            {usernameEdit ? (
                                                <ButtonToolbar>
                                                    <Button bsStyle="success" onClick={() => this.setState({ usernameEdit: false })}>Сохранить</Button>
                                                    <Button onClick={() => this.setState({ usernameEdit: false })}>Отмена</Button>
                                                </ButtonToolbar>
                                            ) : (
                                                <Button onClick={() => this.setState({ usernameEdit: true })}>Изменить юзернейм</Button>
                                            )}
                                        </div>
                                    )}
                                >
                                    <FormControl defaultValue={user.username} bsSize="small" type="text" disabled={!usernameEdit} />
                                </Field>
                                <Field
                                    title="Имя пользователя"
                                    description="Будет видно всем пользователям в ваших постах/комментариях/рецензиях."
                                    actions={(
                                        <div>
                                            {displayNameEdit ? (
                                                <ButtonToolbar>
                                                    <Button bsStyle="success" onClick={() => this.setState({ displayNameEdit: false })}>Сохранить</Button>
                                                    <Button onClick={() => this.setState({ displayNameEdit: false })}>Отмена</Button>
                                                </ButtonToolbar>
                                            ) : (
                                                <Button onClick={() => this.setState({ displayNameEdit: true })}>Изменить юзернейм</Button>
                                            )}
                                        </div>
                                    )}
                                >
                                    <FormControl defaultValue={user.displayName} bsSize="small" type="text" disabled={!displayNameEdit} />
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
