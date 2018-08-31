import React, { PureComponent } from 'react';
import { Grid, GridCell, GridInner } from 'rmwc/Grid';

class Feed extends PureComponent {
  render() {
    return (
      <Grid fixedColumnWidth style={{ flex: 1 }}>
        <GridInner>
          <GridCell span={6}>
            63
          </GridCell>
          <GridCell span={6}>
            63
          </GridCell>
          <GridCell span={12}>
            63
          </GridCell>
        </GridInner>
      </Grid>
    );
  }
}

export default Feed;
