import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import LibraryAnimeFilter from '../../../../components/LibraryAnimeFilter';
import FlexTable from '../../../../components/FlexTable';
import TitledBlock from '../../../../components/TitledBlock';

class UserLibrary extends Component {
  static propTypes = {
    type: PropTypes.string,
  }

  static defaultProps = {
    type: null,
  }

  render() {
    const { type } = this.props;
    let typeTitle = 'Список';
    if (type === 'anime') typeTitle += ' аниме';
    if (type === 'manga') typeTitle += ' манги';
    return (
      <Grid.Row>
        <Grid.Column width={3}>
          <LibraryAnimeFilter />
        </Grid.Column>
        <Grid.Column width={13}>
          <TitledBlock basic size="medium" title="Запланировано">
            <FlexTable>
              <FlexTable.Header />
              <FlexTable.Entries>
                <FlexTable.Entry
                  listType="planned"
                  libraryType="anime"
                  item={{
                    id: 1,
                    poster: 'https://s3.anilist.co/media/anime/cover/large/nx3786-Bpw3uAtKvhq7.jpg',
                    title: 'Evangelion Shin Gekijouban: ||',
                    type: 'Фильм',
                    score: '0',
                    progress: '0/1',
                  }}
                />
                <FlexTable.Entry
                  listType="planned"
                  libraryType="anime"
                  item={{
                    id: 2,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/13/65755.jpg',
                    title: 'Hanamonogatari',
                    type: 'ТВ сериал',
                    score: '0',
                    progress: '0/5',
                  }}
                />
                <FlexTable.Entry
                  listType="planned"
                  libraryType="anime"
                  item={{
                    id: 3,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/1993/93837.jpg',
                    title: 'Sword Art Online: Alicization',
                    type: 'ТВ сериал',
                    score: '0',
                    progress: '0/-',
                  }}
                />
              </FlexTable.Entries>
            </FlexTable>
          </TitledBlock>

          <TitledBlock basic size="medium" title="Смотрю">
            <FlexTable>
              <FlexTable.Header />
              <FlexTable.Entries>
                <FlexTable.Entry
                  listType="current"
                  libraryType="anime"
                  item={{
                    id: 1,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/7/85467.jpg',
                    title: 'Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka Gaiden: Sword Oratoria',
                    type: 'ТВ сериал',
                    score: '0',
                    progress: '1/12',
                  }}
                />
                <FlexTable.Entry
                  listType="current"
                  libraryType="anime"
                  item={{
                    id: 2,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/4/85260.jpg',
                    title: 'Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?',
                    type: 'ТВ сериал',
                    score: '0',
                    progress: '9/12',
                  }}
                />
                <FlexTable.Entry
                  listType="current"
                  libraryType="anime"
                  item={{
                    id: 3,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/13/87235.jpg',
                    title: 'Kino no Tabi: The Beautiful World - The Animated Series',
                    type: 'ТВ сериал',
                    score: '0',
                    progress: '2/12',
                  }}
                />
              </FlexTable.Entries>
            </FlexTable>
          </TitledBlock>

          <TitledBlock basic size="medium" title="Просмотрено">
            <FlexTable>
              <FlexTable.Header />
              <FlexTable.Entries>
                <FlexTable.Entry
                  listType="completed"
                  libraryType="anime"
                  item={{
                    id: 1,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/1327/93616.jpg',
                    title: '3D Kanojo: Real Girl',
                    type: 'ТВ сериал',
                    score: '7',
                    progress: '12',
                  }}
                />
                <FlexTable.Entry
                  listType="completed"
                  libraryType="anime"
                  item={{
                    id: 2,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/7/60263.jpg',
                    title: 'Aldnoah.Zero',
                    type: 'ТВ сериал',
                    score: '9',
                    progress: '12',
                  }}
                />
                <FlexTable.Entry
                  listType="completed"
                  libraryType="anime"
                  item={{
                    id: 3,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/13/63493.jpg',
                    title: 'Ano Natsu de Matteru: Bokutachi wa Koukou Saigo no Natsu wo Sugoshinagara, Ano Natsu de Matteiru.',
                    type: 'Спешл',
                    score: '9',
                    progress: '1',
                  }}
                />
              </FlexTable.Entries>
            </FlexTable>
          </TitledBlock>

          <TitledBlock basic size="medium" title="Отложено">
            <FlexTable>
              <FlexTable.Header />
              <FlexTable.Entries>
                <FlexTable.Entry
                  listType="paused"
                  libraryType="anime"
                  item={{
                    id: 1,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/13/50519.jpg',
                    title: 'ef: A Tale of Melodies.',
                    type: 'ТВ сериал',
                    score: '0',
                    progress: '7/12',
                  }}
                />
                <FlexTable.Entry
                  listType="paused"
                  libraryType="anime"
                  item={{
                    id: 2,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/13/80000.jpg',
                    title: 'Katekyo Hitman Reborn!',
                    type: 'ТВ сериал',
                    score: '0',
                    progress: '13/203',
                  }}
                />
                <FlexTable.Entry
                  listType="paused"
                  libraryType="anime"
                  item={{
                    id: 3,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/8/81186.jpg',
                    title: 'Occultic;Nine',
                    type: 'ТВ сериал',
                    score: '0',
                    progress: '1/12',
                  }}
                />
              </FlexTable.Entries>
            </FlexTable>
          </TitledBlock>

          <TitledBlock basic size="medium" title="Брошено">
            <FlexTable>
              <FlexTable.Header />
              <FlexTable.Entries>
                <FlexTable.Entry
                  listType="dropped"
                  libraryType="anime"
                  item={{
                    id: 1,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/8/77382.jpg',
                    title: 'Gate: Jieitai Kanochi nite, Kaku Tatakaeri 2nd Season',
                    type: 'ТВ сериал',
                    score: '0',
                    progress: '2/12',
                  }}
                />
                <FlexTable.Entry
                  listType="dropped"
                  libraryType="anime"
                  item={{
                    id: 2,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/8/69879.jpg',
                    title: 'Isshuukan Friends. Specials',
                    type: 'Спешл',
                    score: '0',
                    progress: '1/12',
                  }}
                />
                <FlexTable.Entry
                  listType="dropped"
                  libraryType="anime"
                  item={{
                    id: 3,
                    poster: 'https://myanimelist.cdn-dena.com/images/anime/2/11972.jpg',
                    title: 'Tayutama: Kiss on My Deity',
                    type: 'ТВ сериал',
                    score: '0',
                    progress: '10/12',
                  }}
                />
              </FlexTable.Entries>
            </FlexTable>
          </TitledBlock>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default UserLibrary;
