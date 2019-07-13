import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const Wrapper = styled('div')`
  display: flex;
  align-items: flex-end;
  margin-bottom: 42px;
`;

export const Line = styled('div')`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: transparent;
  position: absolute;
  bottom: 0;
  left: 0;
  ${p => p.theme.mixins.transition('background')}
`;


export const Item = styled('div')`
  color: ${p => p.theme.mixins.withOpacity(p.theme.colors.default, 0.7)};
  position: relative;
  display: flex;
  padding: 0 4px 16px;
  font-weight: 500;
  font-size: 18px;
  pointer-events: none;
  border: none;
  outline: none;
  text-decoration: none;
  background: transparent;
  &:hover,
  &:focus,
  &:active {
    border: none;
    outline: none;
    text-decoration: none;
    background: transparent;
  }
  ${p => (p.isClickable && css`
    pointer-events: auto;
    cursor: pointer;
    &:hover {
      ${Line} {
        background: ${p.theme.mixins.withOpacity(p.theme.colors.brand, 0.3)};
      }
    }
    &:active {
      ${Line} {
        background: ${p.theme.mixins.withOpacity(p.theme.colors.brand, 0.5)};
      }
    }
  `)}
  ${p => (p.isActive && css`
    color: ${p.theme.colors.default};
    ${Line} {
      background: ${p.theme.colors.brand} !important;
    }
  `)}
  ${p => p.theme.mixins.transition('color')}
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

export const LabelWrapper = styled('div')`
  padding-left: 8px;
  position: relative;
  top: 2px;
`;
