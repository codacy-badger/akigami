import { action, observable, computed } from 'mobx';

const defaultValue = '';

class SearchStore {
  @observable value = defaultValue;

  @observable focused = false;

  @observable rect = {
    height: 0,
    width: 0,
    top: 0,
    left: 0,
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

  @action.bound
  handleBlur() {
    this.focused = false;
  }

  handleBlockBlur = (e) => {
    e.preventDefault();
  }

  @computed get isClear() {
    return !this.value;
  }

  @computed get showResults() {
    return !this.isClear && this.focused;
  }
}

export default SearchStore;
