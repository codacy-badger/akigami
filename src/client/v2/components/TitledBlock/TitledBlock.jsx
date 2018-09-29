import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header } from 'semantic-ui-react';

class TitledBlock extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
  }
  static defaultProps = {
    children: null,
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.title !== nextProps.title) {
      return true;
    }
    if (this.state.children !== nextProps.children) {
      return true;
    }
    return false;
  }
  render() {
    const { title, children } = this.props;
    return (
      <React.Fragment>
        <Segment basic className="segment-heading">
          <Header size="tiny" color="grey">{title}</Header>
        </Segment>
        <Segment style={{ padding: '.5em' }}>
          {children}
        </Segment>
      </React.Fragment>
    );
  }
}

export default TitledBlock;
