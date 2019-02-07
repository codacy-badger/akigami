import nodemailer from 'nodemailer';
import htmlToText from 'html-to-text';
import config from 'config';
import Promise from 'bluebird';

import RegisterEmail from './register';
import LoginEmail from './login';

const smtpConfig = {
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: config.get('email.noreply.email'),
    pass: config.get('email.noreply.password'),
  },
};

const transporter = Promise.promisifyAll(nodemailer.createTransport(smtpConfig));

export function sendRegister({ email, link }) {
  const renderedTemplate = (new RegisterEmail()).toHtml({ link });
  const renderedPlain = htmlToText.fromString(renderedTemplate, {
    ignoreImage: true,
    ignoreHref: true,
  });
  const mailOptions = {
    from: '"Макисе Курису" <noreply@akg.moe>', // sender address
    to: email, // list of receivers
    subject: 'Регистрация на Акигами', // Subject line
    text: renderedPlain, // plaintext body
    html: renderedTemplate, // html body
  };
  return transporter.sendMailAsync(mailOptions);
}

export function sendLogin({ email, link }) {
  const renderedTemplate = (new LoginEmail()).toHtml({ link });
  const renderedPlain = htmlToText.fromString(renderedTemplate, {
    ignoreImage: true,
    ignoreHref: true,
  });
  const mailOptions = {
    from: '"Таканаси Рикка" <noreply@akg.moe>', // sender address
    to: email, // list of receivers
    subject: 'Вход в Акигами', // Subject line
    text: renderedPlain, // plaintext body
    html: renderedTemplate, // html body
  };
  return transporter.sendMailAsync(mailOptions);
}
