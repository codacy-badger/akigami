import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';

import TitledBlock from '../../components/TitledBlock';

class Feed extends Component {
  render() {
    return (
      <Container>
        <div className="page-content">
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <TitledBlock basic title="Лента активности">
                  Feed
                </TitledBlock>
              </Grid.Column>
              <Grid.Column>
                <TitledBlock title="Последние новости">
                  News
                </TitledBlock>
                <TitledBlock title="что-то ещё">
                  something
                </TitledBlock>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default Feed;
