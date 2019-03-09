import { reaction, computed, observable } from 'mobx';

class UI {
  @observable isOpenSidenav = false;

  @observable isMiniSidenav = false;

  @observable isMobile = false;

  @observable transparented = false;

  @observable transparent = true;

  constructor() {
    this.overlayListener();
  }

  changeTransparented(value) {
    this.transparented = value;
  }

  changeTransparent(value) {
    this.transparent = value;
  }

  minimizeSidebar = () => {
    this.isMiniSidenav = true;
  }

  maximizeSidebar = () => {
    this.isMiniSidenav = false;
  }

  triggerMiniSidebar = () => {
    this.isMiniSidenav = !this.isMiniSidenav;
  }

  openSidenav = () => {
    this.isOpenSidenav = true;
  }

  closeSidenav = () => {
    this.isOpenSidenav = false;
  }

  triggerSidenav = () => {
    this.isOpenSidenav = !this.isOpenSidenav;
  }

  addHtmlClass(classname) {
    if (this.isLoaded) {
      const html = document.getElementsByTagName('html')[0];
      if (!(html.className).includes(classname)) {
        html.classList.add(classname);
      }
    }
  }

  removeHtmlClass(classname) {
    if (this.isLoaded) {
      const html = document.getElementsByTagName('html')[0];
      if ((html.className).includes(classname)) {
        html.classList.remove(classname);
      }
    }
  }

  overlayListener() {
    reaction(
      () => this.isOpenSidenav,
      (isOpen) => {
        const name = 'scroll-lock';
        if (isOpen) this.addHtmlClass(name);
        else this.removeHtmlClass(name);
      },
    );
  }

  async setIsMobile(value) {
    this.isMobile = value;
  }

  @computed get screenWidth() {
    if (typeof window !== 'undefined') return window.innerWidth;
    if (this.isMobile) return 320;
    return 1280;
  }

  @computed get isLoaded() {
    return typeof window !== 'undefined';
  }
}


export default UI;
