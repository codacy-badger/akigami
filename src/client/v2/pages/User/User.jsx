import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer, Provider } from 'mobx-react';
import { Container, Grid, Segment, Header } from 'semantic-ui-react';
import moment from 'moment';

import UserCover from '../../components/UserCover';
import UserStore from './User.store';
import UserMenu from '../../components/UserMenu';

@inject(s => ({
  app: s.app,
  ui: s.app.ui,
  myUser: s.app.user,
}))
@observer
class User extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    myUser: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.store = new UserStore(props.app, props.user);
    this.isOwner = this.isOwner.bind(this);
  }
  componentDidMount() {
    this.props.ui.changeTransparented(true);
  }
  componentWillUnmount() {
    this.props.ui.changeTransparented(false);
  }
  isOwner() {
    const { myUser } = this.props;
    return this.store.id === myUser.id;
  }
  render() {
    return (
      <div className="filled">
        <Provider store={this.store} isOwner={this.isOwner}>
          <React.Fragment>
            <UserCover />
            <div className="page-content">
              <Container>
                <Grid>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <UserMenu />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Segment>
                        left
                      </Segment>
                    </Grid.Column>
                    <Grid.Column>
                      <Segment basic className="segment-heading">
                        <Header size="tiny" color="grey">Общая информация</Header>
                      </Segment>
                      <Segment style={{ padding: '.5em' }}>
                        <Grid celled="internally">
                          <Grid.Row columns={3}>
                            <Grid.Column>
                              <Header sub>Дата регистрации</Header>
                              <span>{moment(this.store.createdAt).format('LL')}</span>
                            </Grid.Column>
                            <Grid.Column>
                              <Header sub>День рождения</Header>
                              <span>
                                {(
                                  this.store.birthday
                                    ? moment(this.store.birthday).format('LL')
                                    : 'Не указан'
                                )}
                              </span>
                            </Grid.Column>
                            <Grid.Column>
                              <Header sub>Пол</Header>
                              <span>{this.store.genderTitle}</span>
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row columns={3}>
                            <Grid.Column>
                              <Header sub>Имя</Header>
                              <span>{this.store.name}</span>
                            </Grid.Column>
                            <Grid.Column>
                              <Header sub>Город</Header>
                              <span>{this.store.city}</span>
                            </Grid.Column>
                            <Grid.Column>
                              <Header sub>Сайт</Header>
                              <a
                                href={this.store.website}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {this.store.website}
                              </a>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </div>
          </React.Fragment>
        </Provider>
      </div>
    );
  }
}

export default User;
