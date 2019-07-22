import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Block.styles';

const Block = props => {
  const { children, padded, mb, overflow, ...otherProps } = props;
  return (
    <Wrapper mb={mb} padded={padded} overflow={overflow} {...otherProps}>
      {children}
    </Wrapper>
  );
};

Block.propTypes = {
  children: PropTypes.any.isRequired,
  padded: PropTypes.bool,
  mb: PropTypes.bool,
  overflow: PropTypes.string,
};

Block.defaultProps = {
  padded: true,
  mb: true,
  overflow: 'visible',
};

export default Block;
