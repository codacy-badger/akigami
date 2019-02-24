import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Container, Grid, Card, Form, Message, Input } from 'semantic-ui-react';

import LoginStore from './Login.store';

@inject('app')
@observer
class Login extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.changeEmail = this.changeEmail.bind(this);
  }

  componentWillUnmount() {
    this.props.store.removeListener();
  }

  changeEmail(e) {
    this.props.store.handleChange('email', e.target.value);
  }

  render() {
    const { handleSend, isValidEmail, email, loading, step } = this.props.store;
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
                  <Card color="red" className="auth-card">
                    {step === 'notLogged' ? (
                      <Card.Content>
                        <Card.Header>Авторизация</Card.Header>
                        <Card.Meta>и регистрация</Card.Meta>
                        <div style={{ marginTop: 48 }}>
                          <Form
                            onSubmit={handleSend}
                            error={email.length > 0 && !isValidEmail}
                          >
                            <Form.Field
                              control={Input}
                              icon="at"
                              iconPosition="left"
                              label="Электронная почта"
                              placeholder="Введите адрес почты"
                              name="email"
                              error={email.length > 0 && !isValidEmail}
                              onChange={this.changeEmail}
                              value={email}
                            />
                            <Message
                              error
                              size="small"
                              content="Введите корректный адрес почты"
                            />
                            <Form.Button
                              primary
                              fluid
                              content="Войти"
                              type="submit"
                              loading={loading}
                              disabled={loading || !isValidEmail}
                            />
                          </Form>
                        </div>
                      </Card.Content>
                    ) : (
                      <Card.Content>
                        <Card.Header>Подтверждение</Card.Header>
                        <Card.Meta>проверьте ваш электронный ящик</Card.Meta>
                        <div style={{ marginTop: 48 }}>
                          <Card.Description>
                            Мы отправили вам письмо с подтверждением авторизации.
                            Пожалуйста проверьте ваш электронный ящик.
                          </Card.Description>
                        </div>
                      </Card.Content>
                    )}
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

export default Login;
