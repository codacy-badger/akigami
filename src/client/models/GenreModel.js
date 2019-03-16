import { observable, action } from 'mobx';

class GenreModel {
  @observable id = null;

  @observable title = null;

  constructor(app, parent, genre) {
    this.app = app;
    this.parent = parent;
    this.setData(genre);
  }

  @action
  setData({ id = this.id, title = this.title }) {
    this.id = id;
    this.title = title;
  }

  editField(field, value) {
    this[field] = value;
  }
}

export default GenreModel;
