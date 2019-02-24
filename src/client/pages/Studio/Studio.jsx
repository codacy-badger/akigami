import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Container, Grid, Image, Header } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import PageHeader from '../../components/PageHeader';
import TitledBlock from '../../components/TitledBlock';

@inject('app')
@observer
class Studio extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    studio: PropTypes.object,
  }

  static defaultProps = {
    studio: {},
  }

  componentDidMount() {
    // const { studio, store } = this.props;
    // store.setData(studio);
  }

  render() {
    const { store } = this.props;
    return (
      <Container>
        <div className="page-content">
          <Grid>
            <PageHeader title="Студия">
              <Button
                icon
                basic
                labelPosition="left"
                href={`/studios/${store.id}/edit`}
              >
                <Icon name="edit" />
                Редактировать
              </Button>
            </PageHeader>
            <Grid.Row>
              <Grid.Column width={4}>
                <Image src={store.image} size="medium" bordered />
              </Grid.Column>
              <Grid.Column width={12}>
                <Header as="h1">{store.title}</Header>
                <TitledBlock title="Описание">
                  {store.about || 'Нет описания'}
                </TitledBlock>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default Studio;
