import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Container, Grid, Card, Form, Message, Input } from 'semantic-ui-react';
import { Formik } from 'formik';

import LoginStore from './Login.store';

@inject('app')
@observer
class Login extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.store = new LoginStore(props.app);
  }
  componentWillUnmount() {
    this.store.removeListener();
  }
  render() {
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
                    {this.store.step === 'notLogged' ? (
                      <Card.Content>
                        <Card.Header>Авторизация</Card.Header>
                        <Card.Meta>и регистрация</Card.Meta>
                        <div style={{ marginTop: 48 }}>
                          <Formik
                            initialValues={{ email: '' }}
                            validate={(values) => {
                              const errors = {};
                              if (!values.email) {
                                errors.email = 'Не указана электронная почта';
                              } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                              ) {
                                errors.email = 'Не верный адрес электронной почты';
                              }
                              return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                              this.store.handleChange('email', values.email);
                              setTimeout(() => {
                                if (this.store.isValidEmail) {
                                  this.store.handleSend();
                                }
                                setSubmitting(false);
                              }, 200);
                            }}
                          >
                            {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                            }) => (
                              <Form
                                onSubmit={handleSubmit}
                                error={errors.email && touched.email}
                              >
                                <Form.Field
                                  control={Input}
                                  icon="at"
                                  iconPosition="left"
                                  label="Электронная почта"
                                  placeholder="Введите адрес почты"
                                  name="email"
                                  error={errors.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.email}
                                />
                                <Message
                                  error
                                  size="small"
                                  content={errors.email}
                                />
                                <Form.Button
                                  primary
                                  fluid
                                  content="Войти"
                                  type="submit"
                                  loading={isSubmitting}
                                  disabled={isSubmitting}
                                />
                              </Form>
                            )}
                          </Formik>
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
