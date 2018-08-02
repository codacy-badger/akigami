import { action, observable } from 'mobx';

export default class TopBar {
  @observable show = true;
  @observable progress = 0;
  @observable color = 'rainbow';
  setProgress(progress) {
    this.progress = progress;
  }

  finish() {
    this.progress = 100;
    setTimeout(
      action(() => {
        this.show = false;
        this.progress = 0;
        setTimeout(
          action(() => {
            this.show = true;
            this.color = 'rainbow';
          }),
          100,
        );
      }),
      500,
    );
  }

  error() {
    this.color = '#FF0000';
    this.finish();
  }
}
