import styled from '@emotion/styled';
import { css } from '@emotion/core';

const disableHref = css`
  text-decoration: none;
`;

export const DropdownMenu = styled('div')`
  ${p => p.theme.mixins.transition('box-shadow background')}
  border-radius: ${p => p.theme.borderRadius};
  box-shadow: 0 3px 16px -4px rgba(0,0,0,0.25);
  background: ${p => p.theme.colors.white};
`;


export const DropdownItem = styled('div')`
  display: block;
  ${(p) => p.as === 'a' && disableHref};
  color: black;
  padding: 7px;
  :hover {
    background: #eaeaea;
    cursor: pointer;
  }
`;
