import styled from '@emotion/styled';
import { css } from '@emotion/core';

const activeState = p => css`
  background: ${p.theme.colors.white};
  box-shadow: 0 3px 16px -4px rgba(0, 0, 0, 0.25);
  max-width: 500px;
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
  transition-property: box-shadow, background, max-width;
  transition-duration: .2s, .2s, .2s;
  transition-timing-function: ease-out, ease-out, ease-in-out;
  transition-delay: 0s, 0s, .1s;
  will-change: box-shadow, background, max-width;
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

export const SearchResults = styled('div')`
  position: fixed;
  top: ${p => (p.top || 0)}px;
  left: ${p => (p.left || 0)}px;
  width: ${p => (p.width || 0)}px;

  background: ${p => p.theme.colors.white};
  border-radius: ${p => p.theme.borderRadius};
  box-shadow: 0 3px 16px -4px rgba(0, 0, 0, 0.25);
  min-height: 100px;
  padding: 12px;
  margin-top: 8px;
  box-sizing: border-box;
`;
