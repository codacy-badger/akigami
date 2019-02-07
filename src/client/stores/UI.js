import { observable } from 'mobx';

export default class UI {
  @observable transparented = false;

  @observable transparent = true;

  changeTransparented(value) {
    this.transparented = value;
  }

  changeTransparent(value) {
    this.transparent = value;
  }
}
