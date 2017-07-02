import React from 'react';
import superagent from 'superagent';
import { observable } from 'mobx';
import URL from 'url';
import qs from 'querystringify';
import find from 'lodash/find';
import pathToRegexp from 'path-to-regexp';

import routes from '../routes';
import modals from '../modals';

export default class Router {
    @observable container;
    constructor(app) {
        this.app = app;
        if (typeof window !== 'undefined') {
            this.initHandler();
            this.setModal(location.search);
        }
    }

    initHandler() {
        document.body.addEventListener('click', (event) => {
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
    }

    linkClickHandler(event, element) {
        const targetAttribute = element.getAttribute('target');
        if (targetAttribute) {
            return;
        }

        // if middle mouse button was clicked
        if (event.button !== 0
            || event.ctrlKey
            || event.altKey
            || event.shiftKey
            || event.metaKey) {
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

        if (location.protocol !== element.protocol || location.hostname !== element.hostname) {
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
        const { href: h, query, ...other } = URL.parse(href);
        if (push) {
            history.pushState(null, null, h);
        }
        if (!skip) {
            this.app.topBar.setProgress(30);
            await this.requestAndInsert(h, query);
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

    async setContainer({ layout, title, props } = {}) {
        if (typeof window !== 'undefined') {
            document.title = title;
        }
        const Module = await Router.import(layout);
        this.container = React.createElement(Module, props);
        return true;
    }

    static async importModal(path) {
        const params = {};
        const data = find(modals, (i) => pathToRegexp(i.path).test(path)) || find(modals, { path: '404' });
        if (data.path !== '404') {
            const keys = [];
            const result = pathToRegexp(data.path, keys).exec(path) || [];
            result.shift()
            result.forEach((i, index) => {
                params[keys[index].name] = i
            });
        }
        const Module = await data.import();
        return Module.default(params);
    }

    async setModal(query) {
        if (query) {
            const { m } = qs.parse(query);
            if (m) {
                const modal = this.app.modal.show();
                const Module = await Router.importModal(m);
                this.app.modal.setSettings(modal.id, Module);
            }
        }
    }
}
