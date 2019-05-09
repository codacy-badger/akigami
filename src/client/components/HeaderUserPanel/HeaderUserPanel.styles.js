import styled from '@emotion/styled';
import { css } from '@emotion/core';


const activeStyle = p => css`
  box-shadow: 0 3px 16px -4px rgba(0,0,0,0.25);
  background: ${p.theme.colors.white};
`;

export const UserWrapper = styled('button')`
  border: none;
  background: none;
  outline: none;
  padding: 7px 17px 7px 7px;
  display: flex;
  align-items: center;
  font-family: ${p => p.theme.fontFamily};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.mixins.transition('box-shadow background')}
  ${p => (p.isActive && activeStyle)}
`;

export const UserAvatar = styled('div')`
  flex-shrink: 0;
`;

export const UserContent = styled('div')`
  padding-left: 12px;
  width: 100%;
  text-align: left;
  margin-top: -1px;
`;

export const UserName = styled('div')`
  line-height: 1;
  font-weight: 500;
  letter-spacing: .2px;
  color: ${p => p.theme.colors.default};
`;

export const UserRank = styled('div')`
  font-size: 12px;
  color: ${p => p.theme.colors.gray};
  line-height: 1;
`;
