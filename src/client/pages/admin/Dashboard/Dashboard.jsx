import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Header } from 'semantic-ui-react';
import Menu from '../Menu';
import PageHeader from '../../../components/PageHeader';

class Dashboard extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
  }

  render() {
    const { activeTab } = this.props;
    return (
      <Container>
        <div className="page-content">
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Menu active={activeTab} />
              </Grid.Column>
              <Grid.Column width={12}>
                <PageHeader title="Панель управления" />
                Dashb123oard
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default Dashboard;
