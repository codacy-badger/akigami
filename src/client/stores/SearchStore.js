import { action, observable, computed } from 'mobx';

const defaultValue = '';

class SearchStore {
  @observable value = defaultValue;

  @observable restState = false;

  @observable blockedBlur = false;

  @observable focused = false;

  @observable rect = {
    left: 0,
    top: 0,
    height: 0,
    width: 0,
  };

  handleSearch = (event) => {
    let value = event;
    if (typeof event !== 'string') {
      ({ value } = event.target);
    }
    this.value = value;
  }

  @action.bound
  setRect(object) {
    this.rect = object;
  }

  handleClear = () => {
    this.value = defaultValue;
  }

  handleFocus = () => {
    this.focused = true;
  }

  handleRest = () => {
    this.restState = true;
  }

  @action.bound
  handleBlur() {
    console.log('handleBlur', this.blockedBlur);
    if (!this.blockedBlur) {
      this.focused = false;
    }
  }

  handleBlockBlur = () => {
    console.log('handleBlockBlur');
    this.blockedBlur = true;
  }

  handleReleaseBlur = () => {
    console.log('handleReleaseBlur');
    this.blockedBlur = false;
  }

  @computed get isClear() {
    return !this.value;
  }

  @computed get showResults() {
    return !this.isClear && this.focused;
  }
}

export default SearchStore;
