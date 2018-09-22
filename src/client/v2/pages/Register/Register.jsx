import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Formik } from 'formik';
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
  }
  render() {
    const { email } = this.props;
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
                        <Formik
                          initialValues={{ gender: null, username: '' }}
                          validate={(values) => {
                            const errors = {};
                            if (!values.username) {
                              errors.username = 'Поле обязательно для заполнения';
                            } else if (values.username.length < 5) {
                              errors.username = 'Имя пользователя должно быть больше 5 символов';
                            }
                            return errors;
                          }}
                          onSubmit={(values, { setSubmitting }) => {
                            Object.keys(values).forEach((key) => {
                              this.store.handleChange(key, values[key]);
                            });
                            setTimeout(() => {
                              this.store.handleRegister();
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
                            setFieldValue,
                          }) => (
                            <Form
                              onSubmit={handleSubmit}
                              error={errors.username && touched.username}
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
                                    active={values.gender === 'male'}
                                    color={values.gender === 'male' ? 'blue' : null}
                                    onClick={() => setFieldValue('gender', 'male')}
                                  >
                                    Мужчина
                                  </Button>
                                  <Button.Or />
                                  <Button
                                    type="button"
                                    active={values.gender === 'female'}
                                    color={values.gender === 'female' ? 'pink' : null}
                                    onClick={() => setFieldValue('gender', 'female')}
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
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                              />
                              <Message
                                error
                                size="small"
                                content={errors.username}
                              />
                              <Form.Button
                                primary
                                fluid
                                content="Зарегистрироваться"
                                type="submit"
                                loading={isSubmitting}
                                disabled={isSubmitting}
                              />
                            </Form>
                          )}
                        </Formik>
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
