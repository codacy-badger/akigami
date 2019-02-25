import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Header, Button, Icon } from 'semantic-ui-react';
import { inject } from 'mobx-react';

import EntityCard from '../../components/EntityCard/EntityCard';
import PageHeader from '../../components/PageHeader';
import mock from './Explore.mock';

@inject('app')
class Explore extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['anime', 'manga']),
    app: PropTypes.any,
  }

  static defaultProps = {
    type: 'anime',
    app: null,
  }

  constructor(props) {
    super(props);
    this.state = { type: props.type };
    this.setTab = this.setTab.bind(this);
    props.app.router.customHandler = this.setTab;
  }

  componentWillUnmount() {
    // this.props.app.router.customHandler = null;
  }

  setTab({ type }) {
    this.setState({
      type,
    });
  }

  render() {
    const { type } = this.state;
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
