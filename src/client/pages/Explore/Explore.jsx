import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Header, Button, Icon } from 'semantic-ui-react';

import EntityCard from '../../components/EntityCard/EntityCard';
import PageHeader from '../../components/PageHeader';
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
              <Grid.Column>
                <PageHeader title={`Обзор ${typeTitle}`}>
                  <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    basic
                    color="olive"
                    href={`/explore/${type}/create`}
                  >
                    <Icon name="edit" />
                    Добавить
                  </Button>
                </PageHeader>
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
