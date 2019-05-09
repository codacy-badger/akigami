import styled from '@emotion/styled';
import { css } from '@emotion/core';


const activeStyle = p => css`
  box-shadow: 0 3px 16px -4px rgba(0,0,0,0.25);
  background: ${p.theme.colors.white};
`;

export default styled('button')`
  border: none;
  background: none;
  outline: none;
  padding: 6px;
  display: flex;
  align-items: center;
  font-family: ${p => p.theme.fontFamily};
  border-radius: ${p => p.theme.borderRadiusCircle};
  ${p => p.theme.mixins.transition('box-shadow background')}
  ${p => (p.isActive && activeStyle)}
`;
