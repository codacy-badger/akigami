import config from 'config';
import BaseEmail from './base';

class RegisterEmail extends BaseEmail {
  renderContent({ link }) {
    return `
      <mj-wrapper padding="12px">
        <mj-section background-color="#D4D4D5" padding="1px" border-radius="4px">
          <mj-column border-radius="4px" background-color="#FFFFFF">
            <mj-section padding="24px 0 16px">
              <mj-column width="180px">
                <mj-image
                  padding="0"
                  width="180px"
                  src="${config.get('hostname')}/images/kurisu.png"
                />
              </mj-column>
              <mj-column width="60%">
                <mj-text
                  font-weight="bold"
                  align="left"
                  font-size="24px"
                  color="#2d2d2d"
                  font-family="'Roboto', sans-serif"
                >
                  Регистрация
                </mj-text>
                <mj-text
                  align="left"
                  font-size="15px"
                  color="#888"
                  line-height="1.45"
                  font-family="'Roboto', sans-serif"
                >
                  Мы вас раньше не видели.
                  <br />
                  Добро пожаловать.
                  <br />
                  <br />
                  Для того, чтобы зарегистрироваться нажмите кнопку ниже
                  и заполните информацию о себе.
                </mj-text>
                <mj-button
                  align="left"
                  background-color="#2185D0"
                  border-radius="4px"
                  font-family="'Roboto', sans-serif"
                  font-size="16px"
                  font-weight="bold"
                  inner-padding="10px 18px"
                  href="${link}"
                >
                  Создать аккаунт
                </mj-button>
              </mj-section>
            </mj-column>
          </mj-column>
        </mj-section>
      </mj-wrapper>
    `;
  }
}

export default RegisterEmail;
