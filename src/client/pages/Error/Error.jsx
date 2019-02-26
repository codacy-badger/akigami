import React, { PureComponent } from 'react';
import { Grid } from 'semantic-ui-react';

import { Block, Code, Help } from './Error.styled';

class Error extends PureComponent {
  render() {
    return (
      <Grid.Row>
        <Grid.Column width={12}>
          <Block>
            <Code>404</Code>
            <Help>Такой страницы не существует!</Help>
          </Block>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default Error;
