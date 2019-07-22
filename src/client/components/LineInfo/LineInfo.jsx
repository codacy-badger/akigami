import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Title, Value } from './LineInfo.styles';

const LineInfo = props => {
  const { children, title } = props;
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Value>{children}</Value>
    </Wrapper>
  );
};

LineInfo.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};

export default LineInfo;
