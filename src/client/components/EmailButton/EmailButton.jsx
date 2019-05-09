import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaGoogle, FaMicrosoft, FaYandex, FaYahoo } from 'react-icons/fa';
import MailRuIcon from './icons/MailRuIcon';
import { Wrapper, IconWrapper, Text } from './EmailButton.styles';

class EmailButton extends Component {
  static propTypes = {
    children: PropTypes.string,
  }

  static defaultProps = {
    children: null,
  }

  static getTypeButton(email) {
    // eslint-disable-next-line no-useless-escape
    const regexp = /.+\@([\w|\d]+)\..+/;
    let type = null;
    if (regexp.test(email)) ([, type] = regexp.exec(email));
    if (type === 'gmail') {
      return {
        title: 'Открыть Gmail почту',
        icon: <FaGoogle />,
        href: 'https://mail.google.com',
      };
    }
    if (['hotmail', 'outlook'].includes(type)) {
      return {
        title: 'Открыть почту Майкрософт',
        icon: <FaMicrosoft />,
        href: 'https://outlook.live.com',
      };
    }
    if (type === 'yandex') {
      return {
        title: 'Открыть почту Яндекс',
        icon: <FaYandex />,
        href: 'https://mail.yandex.ru',
      };
    }
    if (type === 'yahoo') {
      return {
        title: 'Открыть почту Yahoo',
        icon: <FaYahoo />,
        href: 'https://mail.yahoo.com',
      };
    }
    if (type === 'mail') {
      return {
        title: 'Открыть почту Mail.ru',
        icon: <MailRuIcon />,
        href: 'https://e.mail.ru',
      };
    }
    return null;
  }

  render() {
    const { children } = this.props;
    const data = this.constructor.getTypeButton(children);
    if (!data) return false;
    return (
      <Wrapper target="_blank" href={data.href}>
        <IconWrapper>{data.icon}</IconWrapper>
        <Text>{data.title}</Text>
      </Wrapper>
    );
  }
}

export default EmailButton;
