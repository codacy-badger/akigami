import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';

class PageHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { title, children } = this.props;
    return (
      <Grid.Row style={{ display: 'table' }}>
        <Grid.Column>
          <Header floated="left" as="h1">
            {title}
          </Header>
          {children}
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default PageHeader;
