import { observable } from 'mobx';

export default class UI {
  @observable uaScreenWidth = 0;

  @observable transparented = false;

  @observable transparent = true;

  changeTransparented(value) {
    this.transparented = value;
  }

  changeTransparent(value) {
    this.transparent = value;
  }

  async setUAScreenWidth(value) {
    this.uaScreenWidth = value;
  }
}
