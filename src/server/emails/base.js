import mjml2html from 'mjml';
import config from 'config';

class BaseEmail {
  renderHeader() {
    return `
      <mjml>
        <mj-head>
          <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto:400,700&amp;subset=cyrillic" />
          <mj-style inline="inline">
            .shadow {
              box-shadow: 0px 0px 0px 1px #D4D4D5, 0px 2px 0px 0px #DB2828, 0px 1px 3px 0px #D4D4D5;
            }
          </mj-style>
        </mj-head>
        <mj-body background-color="#f7f7f7">
          <mj-section>
            <mj-column>
              <mj-image
                width="220px"
                src="${config.get('hostname')}/images/email-logo.png"
              />
            </mj-column>
          </mj-section>
    `;
  }

  renderContent() {
    return '';
  }

  renderFooter() {
    return `
          <mj-section padding="12px 0 0">
            <mj-column width="50%">
              <mj-image
                align="left"
                width="24px"
                href="${config.get('hostname')}"
                src="${config.get('hostname')}/images/email-mini-logo.png"
              />
            </mj-column>
            <mj-column width="50%">
              <mj-text
                height="28px"
                align="right"
                line-height="28px"
                font-size="12px"
                color="#888"
                line-height="1.45"
                font-family="'Roboto', sans-serif"
              >
                &copy; Akigami 2018
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `;
  }

  toHtml(ctx) {
    const { html } = mjml2html(`
      ${this.renderHeader(ctx)}
      ${this.renderContent(ctx)}
      ${this.renderFooter(ctx)}
    `);
    return html;
  }
}

export default BaseEmail;
