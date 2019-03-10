import { observable } from 'mobx';
import URL from 'url';
import qs from 'querystringify';
import find from 'lodash/find';
import pathToRegexp from 'path-to-regexp';
import UniversalRouter from 'universal-router';

import routes from '../routes';
import modals from '../modals';

export default class Router {
  @observable container;

  customHandler = null;

  @observable currentURL = null;

  router;

  constructor(app) {
    this.app = app;
    this.router = new UniversalRouter(routes, {
      context: { app },
      async errorHandler(error, context) {
        if (error.status != 404) {
          console.log(error);
        }
        return { title: 'Ошибка', component: await import(/* webpackChunkName: "error" */ '../pages/Error') };
      },
    });
    if (typeof window !== 'undefined') {
      this.initHandler();
      this.setModal(window.location.search);
    }
  }

  initHandler() {
    document.body.addEventListener('click', event => {
      if (event.defaultPrevented) {
        return;
      }
      if (event.target.tagName === 'a') {
        this.linkClickHandler(event, event.target);
      } else {
        const link = event.target.closest('a');
        if (!link) {
          return;
        }
        this.linkClickHandler(event, link);
      }
    });
    window.addEventListener('popstate', (e) => {
      this.go(document.location.pathname, false, false);
    }, false);
  }

  clearCustomHandler() {
    this.customHandler = null;
  }

  linkClickHandler(event, element) {
    const targetAttribute = element.getAttribute('target');
    if (targetAttribute) {
      return;
    }

    // if middle mouse button was clicked
    if (
      event.button !== 0
      || event.ctrlKey
      || event.altKey
      || event.shiftKey
      || event.metaKey
    ) {
      return;
    }

    const locationString = element.getAttribute('href');
    if (!locationString) {
      return;
    }
    if (locationString.endsWith('#')) {
      event.preventDefault();
      return;
    }

    if (
      window.location.protocol !== element.protocol
      || window.location.hostname !== element.hostname
    ) {
      return;
    }

    event.preventDefault();

    if (document.location.pathname === element.pathname) {
      this.go(locationString, true, true);
    } else {
      this.go(locationString, true, false);
    }
  }

  async go(href, push = true, skip = false) {
    const { href: h, query } = URL.parse(href);
    if (push) {
      window.history.pushState(null, null, h);
    }
    if (!skip) {
      await this.setContainer(h);
    }
    await this.setModal(query);
  }

  async setContainer(url) {
    const { title, component, params = {}, redirect } = await this.router.resolve(url);
    if (redirect) {
      return { redirect };
    }
    if (typeof window !== 'undefined' && title) {
      document.title = `${title} ~ akigami`;
    }
    if (component) {
      const container = {
        component: component.default,
        props: params,
      };
      if (component.store) {
        const store = new component.store(this.app); // eslint-disable-line new-cap
        if (store.initData) {
          if (typeof window !== 'undefined') {
            store.initData(params);
          } else {
            await store.initData(params);
          }
        }
        Object.assign(container.props, { store });
      }
      this.container = container;
    } else {
      this.customHandler?.(params); // eslint-disable-line no-unused-expressions
    }
    this.currentURL = url;
    return { title };
  }

  async importModal(path, modal) {
    const params = {
      app: this.app,
    };
    const data = find(
      modals,
      i => pathToRegexp(i.path).test(path) || find(modals, { path: '404' }),
    );
    if (data.path !== '404') {
      const keys = [];
      const result = pathToRegexp(data.path, keys).exec(path) || [];
      result.shift();
      result.forEach((i, index) => {
        params[keys[index].name] = i;
      });
    }
    const Module = await data.import();
    return Module.default(params, modal);
  }

  async setModal(query) {
    if (query) {
      const { m } = qs.parse(query);
      if (m) {
        const modal = this.app.modal.show();
        const Module = await this.importModal(m, modal);
        this.app.modal.setSettings(modal.id, Module);
      }
    }
  }

  setTitle(title) {
    document.title = `${title} - Акигами`;
  }

  setURL(url) {
    // сделать сохранение #, ? etc.
    window.history.replaceState(null, null, url);
  }
}
