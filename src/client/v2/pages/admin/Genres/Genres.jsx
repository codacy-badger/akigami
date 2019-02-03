import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, inject, observer } from 'mobx-react';
import { Container, Grid, Button, Header, Icon, Table, Dimmer, Loader } from 'semantic-ui-react';
import GenresStore from '../../../stores/Genres';
import Menu from '../Menu';
import PageHeader from '../../../components/PageHeader';
import NewGenre from './NewGenre';

@inject('app')
@observer
class Genres extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    genres: PropTypes.array.isRequired,
    activeTab: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.store = new GenresStore(props.app);
    this.state = {
      fetching: true,
    };
  }

  componentDidMount() {
    const { genres } = this.props;
    this.store.setData(genres, () => {
      this.setState({ fetching: false });
    });
  }

  render() {
    const { fetching } = this.state;
    const { activeTab } = this.props;
    const { list } = this.store;
    return (
      <Container>
        <div className="page-content">
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Menu active={activeTab} />
              </Grid.Column>
              <Provider store={this.store}>
                <Grid.Column width={12}>
                  <PageHeader title="Список жанров">
                    <NewGenre>
                      <Button
                        icon
                        basic
                        floated="right"
                        labelPosition="left"
                      >
                        <Icon name="edit" />
                        Создать
                      </Button>
                    </NewGenre>
                  </PageHeader>
                  <Table selectable style={{ position: 'relative' }}>
                    <Dimmer active={fetching}>
                      <Loader>Loading</Loader>
                    </Dimmer>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Название</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {list.length ? list.map(genre => (
                        <NewGenre key={genre.id} data={genre}>
                          <Table.Row style={{ cursor: 'pointer' }}>
                            <Table.Cell collapsing>
                              {genre.id}
                            </Table.Cell>
                            <Table.Cell>
                              {genre.title}
                            </Table.Cell>
                          </Table.Row>
                        </NewGenre>
                      )) : (
                        <Table.Row>
                          <Table.Cell>
                            Жанры отсутствуют
                          </Table.Cell>
                        </Table.Row>
                      )}
                    </Table.Body>
                  </Table>
                </Grid.Column>
              </Provider>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default Genres;
