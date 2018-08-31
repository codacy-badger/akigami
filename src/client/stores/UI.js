import { observable } from 'mobx';

export default class UI {
  @observable transparented = false;
  @observable transparent = true;
  @observable sidebarContent = null;

  changeTransparented(value) {
    this.transparented = value;
  }

  changeTransparent(value) {
    this.transparent = value;
  }

  setSidebarContent(content) {
    this.sidebarContent = content;
  }

  clearSidebarContent() {
    this.sidebarContent = null;
  }
}
