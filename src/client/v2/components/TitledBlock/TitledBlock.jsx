import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header } from 'semantic-ui-react';

class TitledBlock extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
    basic: PropTypes.bool,
    padding: PropTypes.bool,
  }
  static defaultProps = {
    children: null,
    basic: false,
    padding: false,
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
    const { title, children, basic, padding } = this.props;
    const paddingValue = padding ? '1em' : '0.5em';
    return (
      <React.Fragment>
        <Segment basic className="segment-heading">
          <Header size="tiny" color="grey">{title}</Header>
        </Segment>
        <Segment
          basic={basic}
          style={{
            padding: basic ? 0 : paddingValue,
          }}
        >
          {children}
        </Segment>
      </React.Fragment>
    );
  }
}

export default TitledBlock;
