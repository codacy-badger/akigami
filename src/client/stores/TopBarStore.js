import { action, observable } from 'mobx';

class TopBarStore {
  @observable show = true;

  @observable progress = 0;

  @observable color = 'rgba(255, 255, 255, .15)';

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
            this.color = 'rgba(255, 255, 255, .15)';
          }),
          100,
        );
      }),
      500,
    );
  }

  error() {
    this.color = 'rgba(213, 67, 67, 0.35)';
    this.finish();
  }
}

export default TopBarStore;
