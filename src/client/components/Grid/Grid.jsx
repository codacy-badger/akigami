import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid/emotion';
import Container from '../Container';

const propTypes = {
  children: PropTypes.any,
};

const defaultProps = {
  children: null,
};

export const Row = ({ children, ...props }) => (
  <Flex mx={-16} flexDirection={['column', 'row']} {...props}>
    {children}
  </Flex>
);

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export const Col = ({ children, width, ...props }) => (
  <Box px={16} width={[1, ...width]} {...props}>
    {children}
  </Box>
);

Col.propTypes = {
  ...propTypes,
  width: PropTypes.array,
};
Col.defaultProps = {
  ...defaultProps,
  width: [],
};

class Grid extends Component {
  static Row = Row;

  static propTypes = propTypes;

  static defaultProps = defaultProps;

  render() {
    const { children, ...props } = this.props;
    return (
      <Container {...props}>
        {children}
      </Container>
    );
  }
}

export default Grid;
