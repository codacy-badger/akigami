import { action, observable, computed, reaction } from 'mobx';

const defaultValue = '';

class SearchStore {
  @observable value = defaultValue;

  @observable focused = false;

  @observable rect = {
    left: 0,
    top: 0,
  };

  @observable rectWH = {
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

  @action.bound
  setRectWH(object) {
    this.rectWH = object;
  }

  handleClear = () => {
    this.value = defaultValue;
  }

  handleFocus = () => {
    this.focused = true;
  }

  @action.bound
  handleBlur() {
    console.log('handleBlur');
    this.focused = false;
  }

  handleBlockBlur = (e) => {
    e.preventDefault();
    console.log('block blur in results');
  }

  @computed get isClear() {
    return !this.value;
  }

  @computed get showResults() {
    return !this.isClear && this.focused;
  }
}

export default SearchStore;
