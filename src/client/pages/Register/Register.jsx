import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Container, Grid, Card, Form, Input, Button, Message } from 'semantic-ui-react';

import RegisterStore from './Register.store';

@inject('app')
@observer
class Register extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.store = new RegisterStore(this.props.app);
    this.changeGenderToFemale = this.changeGenderToFemale.bind(this);
    this.changeGenderToMale = this.changeGenderToMale.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }
  changeGenderToMale() {
    this.store.handleChange('gender', 'male');
  }
  changeGenderToFemale() {
    this.store.handleChange('gender', 'female');
  }
  changeUsername(e) {
    this.store.handleChange('username', e.target.value);
  }
  render() {
    const { email } = this.props;
    const {
      gender,
      handleRegister,
      usernameValid,
      username,
      loading,
      error,
    } = this.store;
    return (
      <React.Fragment>
        <div
          className="background-image blured-image"
          style={{ backgroundImage: "url('/images/SteinsGate.fullhd.jpg')" }}
        />
        <Container className="filled">
          <Grid className="filled">
            <Grid.Row className="filled">
              <Grid.Column>
                <div className="centered-wrapper filled">
                  <Card color="green" className="auth-card">
                    <Card.Content>
                      <Card.Header>Регистрация</Card.Header>
                      <Card.Meta>Давайте создадим аккаунт</Card.Meta>
                      <div style={{ marginTop: 48 }}>
                        <Form
                          onSubmit={handleRegister}
                          error={!usernameValid}
                        >
                          <Form.Field
                            control={Input}
                            icon="at"
                            iconPosition="left"
                            label="Электронная почта"
                            placeholder="Введите адрес почты"
                            value={email}
                            readOnly
                          />
                          <Form.Field>
                            <label>Укажите ваш пол</label>
                            <Button.Group widths="2">
                              <Button
                                type="button"
                                active={gender === 'male'}
                                color={gender === 'male' ? 'blue' : null}
                                onClick={this.changeGenderToMale}
                              >
                                Мужчина
                              </Button>
                              <Button.Or />
                              <Button
                                type="button"
                                active={gender === 'female'}
                                color={gender === 'female' ? 'pink' : null}
                                onClick={this.changeGenderToFemale}
                              >
                                Женщина
                              </Button>
                            </Button.Group>
                          </Form.Field>
                          <Form.Field
                            control={Input}
                            type="text"
                            name="username"
                            label="Имя пользователя"
                            placeholder="Например: Joker"
                            value={username}
                            error={!usernameValid}
                            onChange={this.changeUsername}
                            required
                          />
                          <Message
                            error
                            size="small"
                            content={error}
                          />
                          <Form.Button
                            primary
                            fluid
                            content="Зарегистрироваться"
                            type="submit"
                            loading={loading}
                            disabled={loading || !usernameValid}
                          />
                        </Form>
                      </div>
                    </Card.Content>
                  </Card>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default Register;
