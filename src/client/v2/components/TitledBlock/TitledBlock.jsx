import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header } from 'semantic-ui-react';

class TitledBlock extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
    basic: PropTypes.bool,
    padding: PropTypes.bool,
    normal: PropTypes.bool,
    style: PropTypes.object,
    styleHeader: PropTypes.object,
    size: PropTypes.string,
  }

  static defaultProps = {
    children: null,
    basic: false,
    padding: false,
    normal: false,
    style: {},
    styleHeader: {},
    size: 'tiny',
  }

  shouldComponentUpdate(nextProps) {
    const { children } = this.state;
    const { title } = this.props;
    return (
      title !== nextProps.title
      || children !== nextProps.children
    );
  }

  render() {
    const { size, title, children, basic, padding, normal, style, styleHeader } = this.props;
    const paddingValue = padding ? '1em' : '0.5em';
    const paddingStyle = normal ? '1em' : basic ? 0 : paddingValue; // eslint-disable-line no-nested-ternary
    return (
      <React.Fragment>
        <Segment basic className="segment-heading" style={styleHeader}>
          <Header size={size} color="grey">{title}</Header>
        </Segment>
        <Segment
          basic={basic}
          style={{
            padding: paddingStyle,
            ...style,
          }}
        >
          {children}
        </Segment>
      </React.Fragment>
    );
  }
}

export default TitledBlock;
