import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { TextField } from 'rmwc/TextField';
import { Button } from 'rmwc/Button';
// import { Grid, Row, Col, ControlLabel, HelpBlock } from 'react-bootstrap';

import LoginStore from './Login.store';
// import Wrapper from '../../../components/Wrapper';

import {
  Wrapper,
  Background,
  Panel,
  Blur,
  Header,
} from './Login.styled';

// function FieldGroup({ id, label, help, ...props }) {
//   return (
//     <Group controlId={id}>
//       <ControlLabel>{label}</ControlLabel>
//       <Input {...props} />
//       {help && <HelpBlock>{help}</HelpBlock>}
//     </Group>
//   );
// }

// FieldGroup.propTypes = {
//   id: PropTypes.any.isRequired,
//   label: PropTypes.string.isRequired,
//   help: PropTypes.string,
// };

// FieldGroup.defaultProps = {
//   help: null,
// };

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
    if (this.store.step === 'notLogged') {
      return (
        <Wrapper>
          <Background
            src="/images/SteinsGate.fullhd.jpg"
          />
          <Blur src="/images/SteinsGate.fullhd.jpg">
            <Panel>
              <Header>Авторизация</Header>
              <br />
              <br />
              <TextField
                outlined
                type="email"
                name="email"
                label="Электронная почта"
                value={this.store.email}
                onChange={e =>
                  this.store.handleChange('email', e.target.value)
                }
              />
              <br />
              <Button
                raised
                theme="secondary-bg on-secondary"
                disabled={!this.store.isValidEmail}
                onClick={this.store.handleSend}
              >
                Войти
              </Button>
            </Panel>
          </Blur>
        </Wrapper>
      );
      // return (
      //   <Wrapper opaque>
      //     <Grid>
      //       <Row>
      //         <Col mdOffset={4} md={4}>
      //           <Card>
      //             <Title>Вход</Title>
      //             <Help>укажите свой электронный ящик</Help>
      //             <FieldGroup
      //               id="authEmail"
      //               type="email"
      //               name="email"
      //               label="Email"
      //               placeholder="Например: suzuki@chan.jp"
      //               value={this.store.email}
      // onChange={e =>
      //   this.store.handleChange('email', e.target.value)
      // }
      //             />
      //             <Submit
      //               bsStyle="danger"
      //               bsSize="lg"
      //               disabled={!this.store.isValidEmail}
      //               onClick={this.store.handleSend}
      //               style={{ width: '40%' }}
      //             >
      //               Войти
      //             </Submit>
      //           </Card>
      //         </Col>
      //       </Row>
      //     </Grid>
      //   </Wrapper>
      // );
    }
    return (
      <Wrapper>
        <Background
          src="/images/SteinsGate.fullhd.jpg"
        />
        <Blur src="/images/SteinsGate.fullhd.jpg">
          <Panel>
            <Header>Подтверждение</Header>
            <p style={{ marginTop: 0 }}>проверьте ваш электронный ящик</p>
            <br />
            <br />
            <p style={{ textAlign: 'center' }}>
              Мы отправили вам письмо с подтверждением авторизации.
              Пожалуйста проверьте ваш электронный ящик.
            </p>
          </Panel>
        </Blur>
      </Wrapper>
    );
    // return (
    //   <Wrapper opaque>
    //     <Grid>
    //       <Row>
    //         <Col mdOffset={4} md={4}>
    //           <Card>
    //             <Title>Подтверждение</Title>
    //             <Help>проверьте ваш электронный ящик</Help>

    //             <p>
    //               Мы отправили вам письмо с подтверждением авторизации.
    //               Пожалуйста проверьте ваш электронный ящик.
    //             </p>
    //           </Card>
    //         </Col>
    //       </Row>
    //     </Grid>
    //   </Wrapper>
    // );
  }
}

export default Login;
