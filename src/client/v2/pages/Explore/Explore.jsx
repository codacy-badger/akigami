import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Header } from 'semantic-ui-react';

import EntityCard from '../../components/EntityCard/EntityCard';

import mock from './Explore.mock';

class Explore extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['anime', 'manga']),
  }
  static defaultProps = {
    type: 'anime',
  }
  render() {
    const { type } = this.props;
    let typeTitle = 'аниме';
    if (type === 'manga') typeTitle = 'манги';
    const entities = mock[type];
    return (
      <Container>
        <div className="page-content">
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as="h1">Обзор {typeTitle}</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={5} className="entity-row">
              {entities.map(entity => (
                <Grid.Column
                  key={entity.id}
                  className="entity-column"
                >
                  <EntityCard type={type} item={entity} />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default Explore;
