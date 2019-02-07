import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import debugNamespace from 'debug';
import { inject, observer } from 'mobx-react';
import {
  Container,
  Grid,
  Button,
  Icon,
  Card,
  Image,
  Segment,
  Header,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import PageHeader from '../../components/PageHeader';
import StudiosStore from '../../stores/Studios';

const debug = debugNamespace('akigami:client:studios');

@inject('app')
@observer
class Studios extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    studios: PropTypes.array,
  }

  static defaultProps = {
    studios: [],
  }

  constructor(props) {
    super(props);
    this.store = new StudiosStore(props.app);
  }

  componentDidMount() {
    const { studios } = this.props;
    debug('studios', studios);
    this.store.setData(studios, () => {
      this.store.loading = false;
    });
  }

  render() {
    const { app: { user } } = this.props;
    const { loading, list } = this.store;
    return (
      <Container>
        <div className="page-content">
          <Grid>
            <PageHeader title="Студии">
              <Button
                icon
                basic
                labelPosition="left"
                href="/studios/create"
              >
                <Icon name="edit" />
                Добавить
              </Button>
            </PageHeader>
            <Grid.Row>
              {loading && (
                <Segment basic style={{ height: 300, width: '100%' }}>
                  <Dimmer active={loading} inverted>
                    <Loader inverted content="Загрузка" />
                  </Dimmer>
                </Segment>
              )}
              {!loading && list.length && list.map(item => (
                <Grid.Column key={item.id} width={4}>
                  <Card href={`/studios/${item.id}`}>
                    <Image src={item.image} />
                    <Card.Content>
                      <Card.Header>{item.title}</Card.Header>
                      {item.createdAt && (
                        <Card.Meta>
                          <span className="date">
                            {moment(item.createdAt).format('LL')}
                          </span>
                        </Card.Meta>
                      )}
                      <Card.Description>{item.about}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name="film" />
                      {`${item.entities.length} аниме`}
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
              {!loading && !list.length && (
                <Grid.Column>
                  <Segment padded placeholder textAlign="center">
                    <Header icon>
                      <Icon name="frown outline" />
                      Нет ни одной студии
                    </Header>
                    <Segment.Inline>
                      {user.isAdmin ? (
                        <Button
                          primary
                          href="/studios/create"
                        >
                          Добавить студию
                        </Button>
                      ) : (
                        <Button
                          primary
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              window.history.go('');
                            }
                          }}
                        >
                          Обновить страницу
                        </Button>
                      )}
                    </Segment.Inline>
                  </Segment>
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default Studios;
