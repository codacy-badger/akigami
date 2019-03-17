import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { ResultsWrapper, ResultsHeader, ResultsContent } from './SearchResults.styles';
import Spacer from '../Spacer';
import Button from '../Button';

@inject('search')
@observer
class SearchResults extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
  }

  render() {
    const { search } = this.props;
    if (!search.showResults) return false;
    return (
      <ResultsWrapper
        top={search.rect.top + search.rect.height}
        left={search.rect.left}
        width={search.rect.width}
        onMouseDown={search.handleBlockBlur}
      >
        <ResultsHeader>
          Результаты поиска
          <Spacer full />
          <Button size="extraSmall">Все результаты</Button>
        </ResultsHeader>
        <ResultsContent>
          123
        </ResultsContent>
      </ResultsWrapper>
    );
  }
}

export default SearchResults;
