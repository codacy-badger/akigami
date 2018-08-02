import { observable } from 'mobx';
import { fileToBlobURL } from '../../lib/util';

export default class ModalCropper {
  @observable img = null;
  cropper = null;
  id = null;
  app = null;
  callback = null;
  @observable loading = false;
  constructor(image, callback) {
    this.callback = callback;
    fileToBlobURL(image, image.type).then(url => {
      this.img = url;
    });
  }
  setCropper = ref => {
    this.cropper = ref;
  };
  ok = async () => {
    this.loading = true;
    const data = this.cropper.getData();
    if (this.callback) {
      await this.callback(data);
      this.app.modal.close(this.id);
    }
  };
  setData = (app, id) => {
    this.app = app;
    this.id = id;
  };
}
