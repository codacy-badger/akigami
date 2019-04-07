import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import { FaSearch } from 'react-icons/fa';
import SearchResults from '../SearchResults';
import {
  SearchWrapper,
  SearchIcon,
  SearchInput,
} from './Search.styles';

@inject('search', 'ui')
@observer
class Search extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.refSearchWrapper = React.createRef();
    this.handleTransition = this.handleTransition.bind(this);
  }

  handleTransition() {
    const { search } = this.props;
    if (search.focused) {
      setTimeout(() => {
        search.setRect(this.refSearchWrapper.current.getBoundingClientRect());
      }, 0);
    }
  }

  render() {
    const { search, ui } = this.props;
    return (
      <React.Fragment>
        <SearchWrapper
          ref={this.refSearchWrapper}
          isActive={!search.isClear}
          onFocus={this.handleTransition}
          onTransitionEnd={this.handleTransition}
          width={ui.screenWidth}
        >
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="search"
            value={search.value}
            onChange={search.handleSearch}
            onFocus={search.handleFocus}
            onBlur={search.handleBlur}
            placeholder="Начните поиск"
          />
        </SearchWrapper>
        <SearchResults />
      </React.Fragment>
    );
  }
}

export default Search;
