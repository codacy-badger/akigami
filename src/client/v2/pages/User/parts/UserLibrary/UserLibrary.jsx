import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';

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
    return (
      <Grid.Row>
        <Grid.Column width={4}>фильтр</Grid.Column>
        <Grid.Column width={12}>
          <Header as="h2">{typeTitle}</Header>
          лист
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default UserLibrary;
