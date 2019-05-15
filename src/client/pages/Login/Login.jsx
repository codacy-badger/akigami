import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'emotion-theming';
import { observer, inject } from 'mobx-react';
import { Flex, Box } from '@rebass/grid/emotion';
import { StatefulButton } from '../../components/Button';
import ContentWrapper from '../../components/ContentWrapper';
import Item from '../../components/Item';
import Input from '../../components/Input';
import Divider from '../../components/Divider';
import Radio from '../../components/Radio';
import EmailButton from '../../components/EmailButton';

@withTheme
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
    const { theme, image, store } = this.props;
    return (
      <Flex flex="1">
        <Box
          width={[1, 0.5]}
          css={{
            zIndex: 1,
            display: 'flex',
            borderRadius: `0 ${theme.borderRadius} ${theme.borderRadius} 0`,
            background: theme.colors.background,
            marginLeft: 6,
            marginRight: -6,
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
              {store.step === 'confirm' ? (
                <React.Fragment>
                  <h1>Проверьте почту</h1>
                  <p>
                    На указанный адрес
                    <b>{` ${store.email} `}</b>
                    было отправлено письмо с волшебной ссылкой.
                  </p>
                  <br />
                  <br />
                  <EmailButton>{store.email}</EmailButton>
                </React.Fragment>
              ) : (
                <React.Fragment>
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
                </React.Fragment>
              )}
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
