import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Line, Action, Block, Title, Content } from './FilterBlock.styled';

class FilterBlock extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    action: PropTypes.any,
  };
  static defaultProps = {
    title: null,
    children: null,
    action: null,
  };
  render() {
    const { action, title, children } = this.props;
    return (
      <Block>
        <Line>
          {title && <Title>{title}</Title>}
          {action && <Action>{action}</Action>}
        </Line>
        <Content>{children}</Content>
      </Block>
    );
  }
}

export default FilterBlock;
