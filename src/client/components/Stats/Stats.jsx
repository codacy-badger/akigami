import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Block, Title } from './Stats.styled';

class Stats extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string.isRequired,
    styleTitle: PropTypes.object,
  };
  static defaultProps = {
    children: null,
    styleTitle: {},
  };
  render() {
    const { children, title, styleTitle } = this.props;
    return (
      <Block>
        <Title style={styleTitle}>{title}</Title>
        {children}
      </Block>
    );
  }
}

export default Stats;
