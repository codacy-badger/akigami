import { computed, observable } from 'mobx';

export default class UI {
  @observable isMobile = false;

  @observable transparented = false;

  @observable transparent = true;

  changeTransparented(value) {
    this.transparented = value;
  }

  changeTransparent(value) {
    this.transparent = value;
  }

  async setIsMobile(value) {
    this.isMobile = value;
  }

  @computed get screenWidth() {
    if (typeof window !== 'undefined') return window.innerWidth;
    if (this.isMobile) return 320;
    return 1280;
  }
}
