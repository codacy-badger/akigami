import React, { PureComponent } from 'react';
import { Grid, Header } from 'semantic-ui-react';

class UserLibrary extends PureComponent {
  render() {
    return (
      <Grid.Row>
        <Grid.Column width={4}>фильтр</Grid.Column>
        <Grid.Column width={12}>
          <Header as="h2">Список аниме</Header>
          лист
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default UserLibrary;
