import { observable, action } from 'mobx';
import shortid from 'shortid';
import merge from 'lodash/merge';

export default class Modal {
  id;
  @observable show = true;
  @observable isOverlay = false;
  @observable
  header = {
    title: '',
    className: '',
    component: null,
  };
  @observable
  content = {
    component: null,
    className: '',
    style: {},
  };
  @observable className = '';
  @observable size = 'medium';
  @observable
  footer = {
    className: '',
    component: null,
  };
  @observable props = {};

  store;

  constructor(props) {
    merge(this, props);
  }

  static create(props = {}) {
    merge(props, { id: shortid.generate() });
    return new Modal(props);
  }

  @action
  setSettings = settings => {
    merge(this, settings);
  };
}
