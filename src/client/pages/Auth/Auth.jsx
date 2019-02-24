import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Container, Grid, Card, Loader } from 'semantic-ui-react';

import AuthStore from './Auth.store';

@inject('app')
@observer
class Auth extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.store = new AuthStore(props.app);
  }

  render() {
    // const { handleSend, isValidEmail, email, loading } = this.store;
    return (
      <React.Fragment>
        <div
          className="background-image blured-image"
          style={{ backgroundImage: "url('/images/SteinsGate.fullhd.jpg')" }}
        />
        <Container className="filled">
          <Grid className="filled">
            <Grid.Row className="filled">
              <Grid.Column>
                <div className="centered-wrapper filled">
                  <Card color="red" className="auth-card">
                    <Card.Content style={{ marginTop: 48 }}>
                      <Loader active>Авторизация</Loader>
                    </Card.Content>
                  </Card>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default Auth;
