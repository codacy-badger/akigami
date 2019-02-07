import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import { Container, Grid, Image, Header } from 'semantic-ui-react';

@inject('store', 'isOwner')
@observer
class UserCover extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    // isOwner: PropTypes.func.isRequired,
  }

  render() {
    const { store } = this.props;
    return (
      <div className="user-cover-backdrop">
        <div
          className={cx({
            'user-cover': true,
            'user-no-cover': store.cover.includes('no_cover'),
          })}
          style={{ backgroundImage: `url(${store.cover})` }}
        />
        <div className="transparency-container filled">
          <Container className="filled">
            <Grid className="filled">
              <Grid.Row className="filled">
                <Grid.Column width={16}>
                  <div className="user-cover-container filled">
                    <Image
                      circular
                      src={store.avatar}
                      size="small"
                      style={{ flexShrink: 0 }}
                    />
                    <div className="user-cover-content">
                      <Header inverted as="h1">
                        {store.displayName}
                        <Header.Subheader style={{ height: '1.167em' }}>
                          {store.status}
                        </Header.Subheader>
                      </Header>
                    </div>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}

export default UserCover;
