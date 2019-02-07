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
} from 'semantic-ui-react';
import PageHeader from '../../components/PageHeader';
import StudiosStore from '../../stores/Studios';

const debug = debugNamespace('akigami:client:studios');

// const mock = {
//   id: 1,
//   title: 'A-1 Pictures',
//   image: {
//     original: 'https://avatars.mds.yandex.net/get-zen_doc/196516/pub_5af7fce15f4967a18d618c99_5af97fcbfd96b1ee19ace63f/scale_2400',
//   },
//   about: '',
//   createdAt: new Date('2005-05-09'),
//   entities: [],
// };

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
    this.store.setData(studios);
  }

  render() {
    const { app: { user } } = this.props;
    const { list } = this.store;
    return (
      <Container>
        <div className="page-content">
          <Grid>
            <PageHeader title="Студии">
              <Button
                icon
                basic
                color="olive"
                labelPosition="left"
                href="/studios/create"
              >
                <Icon name="edit" />
                Добавить
              </Button>
            </PageHeader>
            <Grid.Row>
              {list.length ? list.map(item => (
                <Grid.Column key={item.id} width={4}>
                  <Card href={`/studios/${item.id}`}>
                    <Image src={item.image.original} />
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
              )) : (
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
