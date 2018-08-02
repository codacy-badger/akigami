import nodemailer from 'nodemailer';
import { mjml2html } from 'mjml';
import htmlToText from 'html-to-text';
import config from 'config';
import Promise from 'bluebird';

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
  const template = `
    <mjml>
      <mj-body>
        <mj-container>
          <mj-section>
            <mj-column>
            <!--<mj-image width="57" src="https://akg.moe/favicons/apple-icon-57x57.png"></mj-image>-->
            <mj-text font-family="helvetica" color="#333332">Нажмите и подтвердите, что вы хотите создать учетную запись на Акигами. Срок действия этой ссылки истекает через пятнадцать минут, и ее можно использовать только один раз.</mj-text>
            <mj-button background-color="#d54343" href="${link}">Создать учетную запись Акигами</mj-button>
            <mj-text font-family="helvetica" font-size="12px" color="#333332">Или создайте учетную запись, используя эту ссылку:
            <br/>
            <a href="${link}" style="color: #333332;text-decoration: none;">${link}</a>
            </mj-text>
            </mj-column>
          </mj-section>
        </mj-container>
      </mj-body>
    </mjml>
  `;
  const { html: renderedTemplate } = mjml2html(template);
  const renderedPlain = htmlToText.fromString(renderedTemplate, {
    ignoreImage: true,
    ignoreHref: true,
  });
  const mailOptions = {
    from: '"Коёми Арараги" <koyomi@akg.moe>', // sender address
    to: email, // list of receivers
    subject: 'Регистрация на Акигами', // Subject line
    text: renderedPlain, // plaintext body
    html: renderedTemplate, // html body
  };
  return transporter.sendMailAsync(mailOptions);
}

export function sendLogin({ email, link }) {
  const template = `
    <mjml>
      <mj-body>
        <mj-container>
          <mj-section>
            <mj-column>
            <!--<mj-image width="57" src="https://akg.moe/favicons/apple-icon-57x57.png"></mj-image>-->
            <mj-text font-family="helvetica" color="#333332">Нажмите и подтвердите, что вы хотите войти в Акигами. Срок действия этой ссылки истекает через пятнадцать минут, и ее можно использовать только один раз.</mj-text>
            <mj-button background-color="#d54343" href="${link}">Войти в Акигами</mj-button>
            <mj-text font-family="helvetica" font-size="12px" color="#333332">Или войдите используя эту ссылку:
            <br/>
            <a href="${link}" style="color: #333332;text-decoration: none;">${link}</a>
            </mj-text>
            </mj-column>
          </mj-section>
        </mj-container>
      </mj-body>
    </mjml>
  `;
  const { html: renderedTemplate } = mjml2html(template);
  const renderedPlain = htmlToText.fromString(renderedTemplate, {
    ignoreImage: true,
    ignoreHref: true,
  });
  const mailOptions = {
    from: '"Коёми Арараги" <koyomi@akg.moe>', // sender address
    to: email, // list of receivers
    subject: 'Войти в Акигами', // Subject line
    text: renderedPlain, // plaintext body
    html: renderedTemplate, // html body
  };
  return transporter.sendMailAsync(mailOptions);
}
