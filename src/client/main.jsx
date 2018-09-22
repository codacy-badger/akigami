import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import ReactModal from 'react-modal';
import AppStore from './stores/AppStore';
import App from './v2/App';

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
  ReactDOM.render(
    <Provider app={app}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
})();
