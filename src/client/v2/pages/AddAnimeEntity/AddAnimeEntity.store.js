import { toJS, action, observable } from 'mobx';
import set from 'lodash/set';
import AnimeModel from '../../models/Anime';

class AddAnimeEntityStore extends AnimeModel {
  @observable cover = {
    small: '/images/no-cover.jpg',
    medium: '/images/no-cover.jpg',
    large: '/images/no-cover.jpg',
    original: '/images/no-cover.jpg',
  };

  setField(field, value) {
    set(this, field, value);
  }

  submit() {
    console.log(toJS(this));
  }

  @action
  async uploadImage(file, type) {
    if (typeof this[type].original !== 'string' && this[type].original) {
      URL.revokeObjectURL(this[type].original);
    }
    return new Promise((resolve) => {
      this[type].original = URL.createObjectURL(file);
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
}

export default AddAnimeEntityStore;
