import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Flex, Box } from '@rebass/grid/emotion';
import sample from 'lodash/sample';
import { StatefulButton } from '../../components/Button';
import ContentWrapper from '../../components/ContentWrapper';
import Item from '../../components/Item';
import Input from '../../components/Input';
import Divider from '../../components/Divider';
import Radio from '../../components/Radio';

import image1 from './assets/1.jpg';
import image2 from './assets/2.jpg';
import image3 from './assets/3.jpg';
import image4 from './assets/4.jpg';

const image = sample([
  image1,
  image2,
  image3,
  image4,
]);

@inject('ui')
@observer
class Login extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.changeEmail = this.changeEmail.bind(this);
  }

  componentWillMount() {
    const { ui } = this.props;
    ui.changeTransparented(true);
  }

  componentWillUnmount() {
    const { ui, store } = this.props;
    store.removeListener();
    ui.changeTransparented(false);
  }

  changeEmail(e) {
    const { store } = this.props;
    store.handleChange('email', e.target.value);
  }

  render() {
    const { store } = this.props;
    return (
      <Flex flex="1">
        <Box
          width={[1, 0.5]}
          css={{
            boxShadow: '6px 0 16px 0 rgba(0,0,0,.05)',
            zIndex: 1,
            display: 'flex',
          }}
        >
          <ContentWrapper>
            <Box
              css={{
                margin: 'auto',
                maxWidth: 420,
                width: '100%',
                padding: '0 16px 200px',
              }}
            >
              <h1>Вход</h1>
              <Item required title="E-mail">
                <Input
                  block
                  type="email"
                  placeholder="Электронная почта"
                  onChange={this.changeEmail}
                  value={store.email}
                />
              </Item>
              <StatefulButton
                block
                view="primary"
                onClick={store.handleSend}
              >
                Войти
              </StatefulButton>
              <Divider>или зарегистрируйтесь</Divider>
              <Item required title="Имя пользователя">
                <Input
                  block
                  type="text"
                  placeholder="Никнейм"
                />
              </Item>
              <Item title="Город">
                <Input
                  block
                  type="text"
                  placeholder="Откуда вы"
                />
              </Item>
              <Item title="Пол">
                <Flex ml={-12}>
                  <Box p={12}>
                    <Radio id="male" name="gender">Мужчина</Radio>
                  </Box>
                  <Box p={12}>
                    <Radio id="female" name="gender">Женщина</Radio>
                  </Box>
                </Flex>
              </Item>
              <StatefulButton
                block
              >
                Зарегистрироваться
              </StatefulButton>
            </Box>
          </ContentWrapper>
        </Box>
        <Box
          width={[0, 0.5]}
          css={{
            overflow: 'hidden',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPositionX: 'center',
            filter: 'saturate(1.7) contrast(0.7)',
          }}
        />
      </Flex>
    );
    // return (
    //   <Flex css={{ flex: 1 }}>
    //     <Box m="auto">
    //       <Box css={{ textAlign: 'center', fontSize: 32, fontWeight: 700 }}>
    //         Авторизация
    //       </Box>
    //       <Box>Электронная почта: <input type="text"/></Box>
    //       <Box css={{ textAlign: 'center' }}>
    //         <Button>Отправить</Button>
    //       </Box>
    //     </Box>
    //   </Flex>
    // );
    // return (
    //   <React.Fragment>
    //     <div
    //       className="background-image blured-image"
    //       style={{ backgroundImage: "url('/images/SteinsGate.fullhd.jpg')" }}
    //     />
    //     <Container className="filled">
    //       <Grid className="filled">
    //         <Grid.Row className="filled">
    //           <Grid.Column>
    //             <div className="centered-wrapper filled">
    //               <Card color="red" className="auth-card">
    //                 {step === 'notLogged' ? (
    //                   <Card.Content>
    //                     <Card.Header>Авторизация</Card.Header>
    //                     <Card.Meta>и регистрация</Card.Meta>
    //                     <div style={{ marginTop: 48 }}>
    //                       <Form
    //                         onSubmit={handleSend}
    //                         error={email.length > 0 && !isValidEmail}
    //                       >
    //                         <Form.Field
    //                           control={Input}
    //                           icon="at"
    //                           iconPosition="left"
    //                           label="Электронная почта"
    //                           placeholder="Введите адрес почты"
    //                           name="email"
    //                           error={email.length > 0 && !isValidEmail}
    //                           onChange={this.changeEmail}
    //                           value={email}
    //                         />
    //                         <Message
    //                           error
    //                           size="small"
    //                           content="Введите корректный адрес почты"
    //                         />
    //                         <Form.Button
    //                           primary
    //                           fluid
    //                           content="Войти"
    //                           type="submit"
    //                           loading={loading}
    //                           disabled={loading || !isValidEmail}
    //                         />
    //                       </Form>
    //                     </div>
    //                   </Card.Content>
    //                 ) : (
    //                   <Card.Content>
    //                     <Card.Header>Подтверждение</Card.Header>
    //                     <Card.Meta>проверьте ваш электронный ящик</Card.Meta>
    //                     <div style={{ marginTop: 48 }}>
    //                       <Card.Description>
    //                         Мы отправили вам письмо с подтверждением авторизации.
    //                         Пожалуйста проверьте ваш электронный ящик.
    //                       </Card.Description>
    //                     </div>
    //                   </Card.Content>
    //                 )}
    //               </Card>
    //             </div>
    //           </Grid.Column>
    //         </Grid.Row>
    //       </Grid>
    //     </Container>
    //   </React.Fragment>
    // );
  }
}

export default Login;
