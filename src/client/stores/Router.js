import React from 'react';
import superagent from 'superagent';
import { observable } from 'mobx';
import URL from 'url';
import qs from 'querystringify';
import find from 'lodash/find';
import pathToRegexp from 'path-to-regexp';
import UniversalRouter from 'universal-router';

import routes from '../routes';
import router from '../router';
import modals from '../modals';

export default class Router {
  @observable container;

  customHandler = null;

  currentURL = null;

  router;

  constructor(app) {
    this.app = app;
    this.router = new UniversalRouter(router, {
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
      // this.app.topBar.setProgress(30);
      // await this.requestAndInsert(h, query);
      await this.setContainer2(h);
    }
    await this.setModal(query);
  }

  async requestAndInsert(href, hasQuery) {
    const { body, status } = await superagent
      .get(`${href}${hasQuery ? '&' : '?'}time=${Date.now()}`)
      .set('X-PJAX', true)
      .ok(res => res.status < 600);

    await this.setContainer(body);
    document.body.scrollTop = 0;
    if (status > 400) {
      this.app.topBar.error();
    } else {
      this.app.topBar.finish();
    }
  }

  static async import(id) {
    const data = routes[id] || routes.error;
    const Module = await data.import();
    return Module.default;
  }

  async setContainer2(url) {
    const { title, component, params = {}, redirect } = await this.router.resolve(url);
    if (redirect) {
      return { redirect };
    }
    if (typeof window !== 'undefined' && title) {
      document.title = `${title} – Акигами`;
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
      // console.log('hello');
      this.container = container;
      // console.log(this.container.type.prototype);
    } else {
      this.customHandler?.(params); // eslint-disable-line no-unused-expressions
    }
    this.currentURL = url;
    return { title };
  }

  async setContainer({ layout, title, props } = {}) {
    if (typeof window !== 'undefined') {
      document.title = `${title} – Акигами`;
    }
    const Module = await Router.import(layout);
    this.container = { Module, props };
    return true;
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
