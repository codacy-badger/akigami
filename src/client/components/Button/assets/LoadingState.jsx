import React from 'react';
import PropTypes from 'prop-types';
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0.6);
  } 40% {
    transform: scale(1.0);
  }
`;

const Bounce = styled('div')`
  border-radius: 100%;
  display: inline-block;
  animation: ${bounce} 1.32s infinite ease-in-out;
  &:not(:last-child) {
    margin-right: 8px;
  }
  &:nth-of-type(1) {
    animation-delay: -0.32s;
  }
  &:nth-of-type(2) {
    animation-delay: -0.16s;
  }
`;


function makeSize(p) {
  switch (p.size) {
  case 'small':
    return css`
      ${Bounce} {
        width: 6px;
        height: 6px;
      }
    `;
  case 'large':
    return css`
      ${Bounce} {
        width: 14px;
        height: 14px;
      }
    `;
  default:
    return css`
      ${Bounce} {
        width: 10px;
        height: 10px;
      }
    `;
  }
}

const Wrapper = styled('div')`
  display: flex;
  ${Bounce} {
    background: ${p => (
    ['default', 'disable'].includes(p.view)
      ? p.theme.colors.gray
      : p.theme.colors.white
  )};
  }
  ${makeSize}
`;

export const LoadingState = ({ size, view }) => (
  <Wrapper size={size} view={view}>
    <Bounce />
    <Bounce />
    <Bounce />
  </Wrapper>
);

LoadingState.propTypes = {
  size: PropTypes.oneOf(['default', 'small', 'large']),
  view: PropTypes.oneOf(['default', 'success', 'warning', 'danger', 'info', 'primary', 'disable']),
};

LoadingState.defaultProps = {
  size: 'default',
  view: 'default',
};

export default LoadingState;
