/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { Provider } from 'mobx-react';
import { renderStylesToString } from 'emotion-server';
import { renderToString } from 'react-dom/server';
import { ThemeProvider } from 'emotion-theming';
import pick from 'lodash/pick';

import AppStore from '../../client/stores/AppStore';
import App from '../../client/v2/App';
import template from '../template';
import theme from '../../common/styles/themes';

async function ssr({ title, layout, props = {}, ...data } = {}) {
  try {
    if (props) {
      Object.keys(props).forEach(item => {
        if (props[item]?.constructor.name === 'model') {
          props[item] = props[item].toObject();
        }
      });
    }
    if (!this.req.get('x-pjax')) {
      const app = new AppStore();
      const user = pick(this.req.user, [
        'username',
        'displayName',
        'id',
        'avatar',
      ]);
      app.user.setUser(user);
      await app.router.setContainer({ title, layout, props });
      const html = renderStylesToString(renderToString((
        <ThemeProvider theme={theme}>
          <Provider app={app}>
            <App />
          </Provider>
        </ThemeProvider>
      )));
      const render = Object.assign(
        {
          body: html,
          css: '<link rel="stylesheet" href="/assets/style.css" />',
          user: JSON.stringify(user || {}),
          js:
            '<script type="text/javascript" src="/assets/modules.chunk.js"></script><script type="text/javascript" src="/assets/app.js"></script>',
          preload: `<script type="application/json" id="preload-data" data-layout="${layout}" data-title="${title}">${JSON.stringify(props)}</script>`,
          title,
        },
        data,
      );

      this.send(template(render));
      return;
    }
    this.json({
      title,
      layout,
      props,
    });
    return;
  } catch (e) {
    console.log(e);
  }
}

export default ssr;
