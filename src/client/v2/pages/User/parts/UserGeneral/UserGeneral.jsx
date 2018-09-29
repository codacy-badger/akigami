import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import TitledBlock from '../../../../components/TitledBlock';
import UserSummary from '../../../../components/UserSummary';

class UserGeneral extends Component {
  render() {
    return (
      <Grid.Row columns={2}>
        <Grid.Column>
          <TitledBlock basic title="Активность">
            left
          </TitledBlock>
        </Grid.Column>
        <Grid.Column>
          <TitledBlock title="Общая информация">
            <UserSummary />
          </TitledBlock>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default UserGeneral;
