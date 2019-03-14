import styled from '@emotion/styled';
import { css } from '@emotion/core';

const activeState = p => css`
  background: ${p.theme.colors.white};
  box-shadow: 0 3px 16px -4px rgba(0, 0, 0, 0.25);
  max-width: 400px;
`;

export const SearchWrapper = styled('div')`
  border-radius: ${p => p.theme.borderRadius};
  background: none;
  display: flex;
  align-items: center;
  padding: 0 12px;
  overflow: hidden;
  max-width: 200px;
  width: 100%;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  ${p => p.theme.mixins.transition('box-shadow background max-width')}
  ${p => (p.isActive && activeState)}
  &:focus-within {
    ${activeState}
  }
`;

export const SearchIcon = styled('div')`
  flex-shrink: 0;
  display: flex;
  margin-right: 12px;
  font-size: 18px;
  color: ${p => p.theme.colors.default};
`;

export const SearchInput = styled('input')`
  line-height: 28px;
  border: none;
  outline: none;
  padding: 8px 0;
  width: 100%;
  background: none;
  font-family: ${p => p.theme.fontFamily};
`;
