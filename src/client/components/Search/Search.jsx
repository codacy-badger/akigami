import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { FaSearch } from 'react-icons/fa';
import {
  SearchWrapper,
  SearchIcon,
  SearchInput,
  SearchResults,
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
      search.setRect(this.refSearchWrapper.current.getBoundingClientRect());
    }
  }

  render() {
    const { search, ui } = this.props;
    return (
      <React.Fragment>
        <SearchWrapper
          ref={this.refSearchWrapper}
          isActive={!search.isClear}
          onTransitionEnd={this.handleTransition}
          left={search.rect.left}
          width={ui.screenWidth}
          isAbsolute={!!search.rect.left && (search.focused || !search.isClear)}
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
        {search.showResults && (
          <SearchResults
            top={search.rect.top + search.rect.height}
            left={search.rect.left}
            width={search.rect.width}
            onMouseDown={search.handleBlockBlur}
          >
            Results
          </SearchResults>
        )}
      </React.Fragment>
    );
  }
}

export default Search;
