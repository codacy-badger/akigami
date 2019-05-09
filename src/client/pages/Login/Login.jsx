import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Flex, Box } from '@rebass/grid/emotion';
import { StatefulButton } from '../../components/Button';
import ContentWrapper from '../../components/ContentWrapper';
import Item from '../../components/Item';
import Input from '../../components/Input';
import Divider from '../../components/Divider';
import Radio from '../../components/Radio';

@inject('ui')
@observer
class Login extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.changeEmail = this.changeEmail.bind(this);
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
    const { image, store } = this.props;
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
                padding: '40px 16px 200px',
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
  }
}

export default Login;
