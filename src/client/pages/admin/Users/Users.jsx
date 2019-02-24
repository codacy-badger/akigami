import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import debugNamespace from 'debug';
import { Container, Grid, Dimmer, Loader, Table } from 'semantic-ui-react';

import Menu from '../Menu';
import PageHeader from '../../../components/PageHeader';

const debug = debugNamespace('akigami:client:admin:users');

@inject('app')
@observer
class Users extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
    };
  }

  componentDidMount() {
    // const { users } = this.props;
    // this.store.setData(users, () => {
    //   this.setState({ fetching: false });
    // });
  }

  handleGo = (user) => {
    const { app } = this.props;
    app.router.go(`/@${user.username}`);
  }

  render() {
    const { fetching } = this.state;
    const { activeTab, store } = this.props;
    const { list } = store;
    debug(list);
    return (
      <Container>
        <div className="page-content">
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Menu active={activeTab} />
              </Grid.Column>
              <Grid.Column width={12}>
                <PageHeader title="Список пользователей" />
                <Table selectable style={{ position: 'relative' }}>
                  <Dimmer active={fetching}>
                    <Loader>Loading</Loader>
                  </Dimmer>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Никнейм</Table.HeaderCell>
                      <Table.HeaderCell>Электронная почта</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {list.length ? list.map(user => (
                      <Table.Row
                        key={user.id}
                        onClick={() => this.handleGo(user)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Table.Cell collapsing>
                          {user.id}
                        </Table.Cell>
                        <Table.Cell>
                          {user.displayName}
                        </Table.Cell>
                        <Table.Cell>
                          {user.email}
                        </Table.Cell>
                      </Table.Row>
                    )) : (
                      <Table.Row>
                        <Table.Cell>
                          Пользователей нет
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default Users;
