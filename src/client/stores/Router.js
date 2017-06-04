import React from 'react';
import superagent from 'superagent';
import { observable } from 'mobx';

import routes from '../routes';

export default class Router {
    @observable container;
    constructor(app) {
        this.app = app;
        if (typeof window !== 'undefined') {
            this.initHandler();
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
        event.preventDefault();

        this.go(locationString);
    }

    async go(href, push = true) {
        if (push) {
            history.pushState(null, null, href);
        }
        this.app.topBar.setProgress(30);
        await this.requestAndInsert(href);
    }

    async requestAndInsert(href) {
        const { body, status } = await superagent
            .get(`${href}?time=${Date.now()}`)
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
}