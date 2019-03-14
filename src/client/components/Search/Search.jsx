import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import noop from 'lodash/noop';
import { SearchWrapper, SearchIcon, SearchInput } from './Search.styles';

class Search extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    value: '',
    onChange: noop,
    placeholder: '',
  }

  render() {
    const { value, onChange, placeholder, ...props } = this.props;
    return (
      <SearchWrapper isActive={!!value}>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      </SearchWrapper>
    );
  }
}

export default Search;
