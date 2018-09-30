import React, { Component } from 'react';
import { Input, Button, Dropdown } from 'semantic-ui-react';
import TitledBlock from '../TitledBlock';
import LibraryAnimeListFilter from '../LibraryAnimeListFilter';

class LibraryAnimeFilter extends Component {
  render() {
    return (
      <React.Fragment>
        <Input fluid icon="search" placeholder="Поиск..." />
        <TitledBlock basic title="Списки">
          <LibraryAnimeListFilter />
        </TitledBlock>
        <TitledBlock basic title="Фильтры">
          <Dropdown
            placeholder="Формат"
            fluid
            selection
            multiple
            style={{ marginBottom: '.5em' }}
            options={[
              { key: 'tv', text: 'ТВ сериал', value: 'tv' },
              { key: 'movie', text: 'Фильм', value: 'movie' },
              { key: 'special', text: 'Спешл', value: 'special' },
              { key: 'ova', text: 'OVA', value: 'ova' },
              { key: 'ona', text: 'ONA', value: 'ona' },
              { key: 'music', text: 'Клип', value: 'music' },
            ]}
          />
          <Dropdown
            placeholder="Статус"
            fluid
            multiple
            selection
            options={[
              { key: 'announced', text: 'Анонсировано', value: 'announced' },
              { key: 'ongoing', text: 'Сейчас выходит', value: 'ongoing' },
              { key: 'released', text: 'Вышло', value: 'released' },
              { key: 'latest', text: 'Недавние', value: 'latest' },
            ]}
          />
        </TitledBlock>
      </React.Fragment>
    );
  }
}

export default LibraryAnimeFilter;
