import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
} from 'react-bootstrap';
import Datetime from 'react-datetime';

import SignUpStore from './SignUp.store';
import AvatarUploader from '../../../components/AvatarUploader';
import GenderChanger from '../../../components/GenderChanger';
import Wrapper from '../../../components/Wrapper';
import { Card, Input, Group, Submit, Help, Title } from '../Login/Login.styled';

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
class SignUp extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.store = new SignUpStore(this.props.app);
  }
  render() {
    return (
      <Wrapper opaque>
        <Grid>
          <Row>
            <Col mdOffset={4} md={4}>
              <Card>
                <Title>Регистрация</Title>
                <Help>давайте создадим ваш аккаунт</Help>

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
                  onChange={e =>
                    this.store.handleChange('username', e.target.value)
                  }
                  help="Поле обязательно для заполнения"
                />
                <Group controlId="birthday">
                  <ControlLabel>День рождения</ControlLabel>
                  <Datetime
                    locale="ru"
                    dateFormat="LL"
                    timeFormat={false}
                    placeholder="Например 01.01.1995"
                    value={this.store.birthday}
                    onChange={e => this.store.handleChange('birthday', e._d)}
                  />
                </Group>
                <Submit
                  bsStyle="danger"
                  bsSize="lg"
                  onClick={this.store.handleRegister}
                >
                  Создать аккаунт
                </Submit>
              </Card>
            </Col>
          </Row>
        </Grid>
      </Wrapper>
    );
  }
}

export default SignUp;
