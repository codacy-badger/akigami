import { reaction, computed, observable } from 'mobx';

class UIStore {
  @observable isOpenSidenav = false;

  @observable isMiniSidenav = false;

  @observable isMobile = false;

  @observable transparented = false;

  @observable transparent = true;

  @observable screenWidthVar = null;

  @observable blurMenuBackground = null;

  constructor() {
    this.overlayListener();
    if (_CLIENT_) {
      window.addEventListener('resize', this.handleResize);
    }
  }

  handleResize = () => {
    this.screenWidthVar = window.innerWidth;
  }

  changeTransparented(value) {
    this.transparented = value;
  }

  changeTransparent(value) {
    this.transparent = value;
  }

  setBlurMenuBackground(img) {
    this.blurMenuBackground = img;
  }

  removeBlurMenuBackground() {
    this.blurMenuBackground = null;
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
    if (_CLIENT_) {
      const html = document.querySelector('html');
      if (!(html.className).includes(classname)) {
        html.classList.add(classname);
      }
    }
  }

  removeHtmlClass(classname) {
    if (_CLIENT_) {
      const html = document.querySelector('html');
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
    if (this.screenWidthVar) return this.screenWidthVar;
    if (_CLIENT_) return window.innerWidth;
    if (this.isMobile) return 320;
    return 1280;
  }
}


export default UIStore;
