import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'emotion-theming';
import ReactModal from 'react-modal';
import AppStore from './stores/AppStore';
import App from './v2/App';
import theme from '../common/styles/themes';

(async () => {
  const raw = document.querySelector('#preload-data');
  const userData = JSON.parse(document.body.dataset.user);
  const app = new AppStore();
  app.user.setUser(userData);
  await app.router.setContainer({
    title: raw.dataset.title,
    props: raw.text ? JSON.parse(raw.text) : null,
    layout: raw.dataset.layout,
  });
  if (typeof window !== 'undefined') {
    ReactModal.setAppElement('#root');
  }
  ReactDOM.hydrate(
    <ThemeProvider theme={theme}>
      <Provider app={app}>
        <App />
      </Provider>
    </ThemeProvider>,
    document.getElementById('root'),
  );
})();
