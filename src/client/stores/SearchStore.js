import { observable } from 'mobx';

const defaultValue = '';

class SearchStore {
  @observable value = defaultValue;

  handleSearch(value) {
    this.value = value;
  }

  handleClear() {
    this.value = defaultValue;
  }
}

export default SearchStore;
