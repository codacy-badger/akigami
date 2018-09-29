import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer, Provider } from 'mobx-react';
import { Container, Grid, Segment } from 'semantic-ui-react';

import UserCover from '../../components/UserCover';
import UserStore from './User.store';
import UserMenu from '../../components/UserMenu';
import TitledBlock from '../../components/TitledBlock';
import UserSummary from '../../components/UserSummary';

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
  }
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
                      <TitledBlock title="Общая информация">
                        <UserSummary />
                      </TitledBlock>
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
