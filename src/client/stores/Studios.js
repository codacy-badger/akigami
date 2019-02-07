import { observable } from 'mobx';
import StudioModel from '../models/Studio';

class Studios {
  @observable list = [];

  @observable loading = true;

  constructor(app, array) {
    if (app) this.app = app;
    if (array) this.setData(array);
  }

  setData(array, cb) {
    this.list = array.map(this.wrapModel);
    if (cb) cb();
  }

  wrapModel = item => new StudioModel(this.app, item);
}

export default Studios;
