import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer, Provider } from 'mobx-react';
import { Menu, Container, Grid, Label, Dropdown } from 'semantic-ui-react';

import UserCover from '../../components/UserCover';
import UserStore from './User.store';

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
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Menu>
                        <Menu.Item
                          name="home"
                          active
                          as="a"
                        >
                          Главная
                        </Menu.Item>
                        <Dropdown
                          item
                          simple
                          text="Библиотека"
                        >
                          <Dropdown.Menu>
                            <Dropdown.Item as="a">Аниме</Dropdown.Item>
                            <Dropdown.Item as="a">Манга</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item
                          name="followers"
                          as="a"
                        >
                          Подписчики
                          <Label>12</Label>
                        </Menu.Item>
                        <Menu.Item
                          name="following"
                          as="a"
                        >
                          Подписки
                          <Label>42</Label>
                        </Menu.Item>
                        <Menu.Item
                          name="clubs"
                          as="a"
                        >
                          Клубы
                          <Label>3</Label>
                        </Menu.Item>
                      </Menu>
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
