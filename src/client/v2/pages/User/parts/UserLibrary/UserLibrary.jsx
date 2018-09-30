import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Image, Table } from 'semantic-ui-react';
import LibraryAnimeFilter from '../../../../components/LibraryAnimeFilter';

class UserLibrary extends PureComponent {
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

    const tableBody = (
      <React.Fragment>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell disabled collapsing textAlign="center"></Table.HeaderCell>
            <Table.HeaderCell>Название</Table.HeaderCell>
            <Table.HeaderCell collapsing textAlign="center">Тип</Table.HeaderCell>
            <Table.HeaderCell collapsing textAlign="center">Прогресс</Table.HeaderCell>
            <Table.HeaderCell collapsing textAlign="center">Оценка</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell disabled collapsing textAlign="center">
              <div className="library-image-wrapper">
                <div
                  className="library-image"
                  style={{
                    backgroundImage: 'url(https://myanimelist.cdn-dena.com/images/anime/7/85467.jpg)',
                  }}
                />
              </div>
            </Table.Cell>
            <Table.Cell>
              <a href="/anime/1">
                Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka Gaiden: Sword Oratoria
              </a>
            </Table.Cell>
            <Table.Cell collapsing textAlign="center">ТВ</Table.Cell>
            <Table.Cell collapsing textAlign="center">1/12</Table.Cell>
            <Table.Cell collapsing textAlign="center">-</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell disabled collapsing textAlign="center">
              <div className="library-image-wrapper">
                <div
                  className="library-image"
                  style={{
                    backgroundImage: 'url(https://myanimelist.cdn-dena.com/images/anime/4/85260.jpg)',
                  }}
                />
              </div>
            </Table.Cell>
            <Table.Cell>
              <a href="/anime/2">
                Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?
              </a>
            </Table.Cell>
            <Table.Cell collapsing textAlign="center">ТВ</Table.Cell>
            <Table.Cell collapsing textAlign="center">9/12</Table.Cell>
            <Table.Cell collapsing textAlign="center">-</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell disabled collapsing textAlign="center">
              <div className="library-image-wrapper">
                <div
                  className="library-image"
                  style={{
                    backgroundImage: 'url(https://myanimelist.cdn-dena.com/images/anime/13/87235.jpg)',
                  }}
                />
              </div>
            </Table.Cell>
            <Table.Cell>
              <a href="/anime/3">
                Kino no Tabi: The Beautiful World - The Animated Series
              </a>
            </Table.Cell>
            <Table.Cell collapsing textAlign="center">ТВ</Table.Cell>
            <Table.Cell collapsing textAlign="center">2/12</Table.Cell>
            <Table.Cell collapsing textAlign="center">-</Table.Cell>
          </Table.Row>
        </Table.Body>
      </React.Fragment>
    );

    return (
      <Grid.Row>
        <Grid.Column width={4}>
          <LibraryAnimeFilter />
        </Grid.Column>
        <Grid.Column width={12}>
          <Header as="h2">{typeTitle}</Header>
          <Table selectable color="blue" className="library-table">
            {tableBody}
          </Table>

          <Table selectable color="green" className="library-table">
            {tableBody}
          </Table>

          <Table selectable color="purple" className="library-table">
            {tableBody}
          </Table>

          <Table selectable color="grey" className="library-table">
            {tableBody}
          </Table>

          <Table selectable color="red" className="library-table">
            {tableBody}
          </Table>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default UserLibrary;
