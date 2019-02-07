import { observable } from 'mobx';
import StudioModel from '../models/Studio';

class Studios {
  @observable list = [];

  constructor(app, array) {
    if (app) this.app = app;
    if (array) this.setData(array);
  }

  setData(array) {
    this.list = array.map(this.wrapModel);
  }

  wrapModel = item => new StudioModel(this.app, item);
}

export default Studios;
