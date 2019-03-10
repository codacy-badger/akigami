import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const views = {
  info: ({ theme: { colors, mixins } }) => css`
    background: ${colors.info};
    color: ${colors.white};
    &:hover {
      background: ${mixins.darken(colors.info, '5%')};
    }
    &:active {
      background: ${mixins.darken(colors.info, '10%')};
    }
  `,
  danger: ({ theme: { colors, mixins } }) => css`
    background: ${colors.danger};
    color: ${colors.white};
    &:hover {
      background: ${mixins.darken(colors.danger, '5%')};
    }
    &:active {
      background: ${mixins.darken(colors.danger, '10%')};
    }
  `,
  warning: ({ theme: { colors, mixins } }) => css`
    background: ${colors.warning};
    color: ${colors.white};
    &:hover {
      background: ${mixins.darken(colors.warning, '5%')};
    }
    &:active {
      background: ${mixins.darken(colors.warning, '10%')};
    }
  `,
  success: ({ theme: { colors, mixins } }) => css`
    background: ${colors.success};
    color: ${colors.white};
    &:hover {
      background: ${mixins.darken(colors.success, '5%')};
    }
    &:active {
      background: ${mixins.darken(colors.success, '10%')};
    }
  `,
  primary: ({ theme: { colors, mixins } }) => css`
    background: ${colors.primary};
    color: ${colors.white};
    &:hover {
      background: ${mixins.darken(colors.primary, '5%')};
    }
    &:active {
      background: ${mixins.darken(colors.primary, '10%')};
    }
  `,
  default: ({ theme: { colors, mixins } }) => css`
    background: ${colors.white};
    color: ${colors.default};
    border-color: ${colors.border};
    &:hover {
      background: ${mixins.darken(colors.white, '5%')};
    }
    &:active {
      background: ${mixins.darken(colors.white, '10%')};
    }
  `,
  borderless: ({ theme: { colors, mixins } }) => css`
    background: ${colors.white};
    color: ${colors.default};
    &:hover {
      background: ${mixins.darken(colors.white, '5%')};
    }
    &:active {
      background: ${mixins.darken(colors.white, '10%')};
    }
  `,
  disable: ({ theme: { colors } }) => css`
    pointer-events: none;
    background: ${colors.white};
    color: ${colors.border};
    border-color: ${colors.border};
  `,
};

const sizes = {
  small: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  large: css`
    padding: 18px 36px;
    font-size: 18px;
  `,
  default: css`
    padding: 12px 22px;
    font-size: 16px;
  `,
};

const paddingWithIcons = {
  smallLeft: css`
    padding-left: 12px;
  `,
  smallRight: css`
    padding-right: 12px;
  `,
  smallSingle: css`
    padding-left: 8px;
    padding-right: 8px;
  `,
  largeLeft: css`
    padding-left: 24px;
  `,
  largeRight: css`
    padding-right: 24px;
  `,
  largeSingle: css`
    padding-bottom: 18.67px;
    padding-left: 17px;
    padding-right: 19px;
  `,
  defaultLeft: css`
    padding-left: 14px;
  `,
  defaultRight: css`
    padding-right: 14px;
  `,
  defaultSingle: css`
    padding-left: 12px;
    padding-right: 12px;
  `,
};

const iconSizes = {
  small: css`
    font-size: 18px;
  `,
  large: css`
    font-size: 22px;
  `,
  default: css`
    font-size: 20px;
  `,
};

export function makeView(p) {
  const isValid = Object.keys(views).includes(p.view);
  return views[isValid ? p.view : 'default'];
}

function makeSize(p) {
  const isValid = Object.keys(sizes).includes(p.size);
  return sizes[isValid ? p.size : 'default'];
}

const collapsed = (p) => css`
  > span {
    display: none;
  }
  ${p.size === 'large' && paddingWithIcons.largeSingle}
  ${p.size === 'small' && paddingWithIcons.smallSingle}
  ${p.size === 'default' && paddingWithIcons.defaultSingle}
`;

export const StyledButton = styled('button')`
  border: 1px solid transparent;
  cursor: pointer;
  margin: 0;
  outline: none !important;
  ${makeView}
  ${makeSize}
  border-radius: ${p => p.theme.borderRadius};
  font-family: ${p => p.theme.fontFamily};
  font-weight: 500;
  box-sizing: border-box;
  text-decoration: none;
  white-space: nowrap;
  ${p => ((p.isIconSingle || p.isIconLeft || p.isIconRight) && css`
    display: inline-flex;
    align-items: center;
  `)}
  ${(p) => {
    if (p.isIconLeft) {
      switch (p.size) {
      case 'large': return paddingWithIcons.largeLeft;
      case 'small': return paddingWithIcons.smallLeft;
      default: return paddingWithIcons.defaultLeft;
      }
    }
    return '';
  }}
  ${(p) => {
    if (p.isIconRight) {
      switch (p.size) {
      case 'large': return paddingWithIcons.largeRight;
      case 'small': return paddingWithIcons.smallRight;
      default: return paddingWithIcons.defaultRight;
      }
    }
    return '';
  }}
  ${(p) => {
    if (p.isIconSingle) {
      switch (p.size) {
      case 'large': return paddingWithIcons.largeSingle;
      case 'small': return paddingWithIcons.smallSingle;
      default: return paddingWithIcons.defaultSingle;
      }
    }
    return '';
  }}
  ${p => (p.collapsible && css`
    @media screen and (max-width: 1280px) {
      ${collapsed(p)};
    }
  `)}
  ${p => (p.collapsed && collapsed)}
  ${p => (p.block && css`
    width: 100%;
  `)}
  ${p => (p.transparent && css`
    background: transparent;
  `)}
  ${(p) => {
    if (p.active) {
      if (['default', 'borderless'].includes(p.view)) {
        return css`
          background: ${p.theme.mixins.darken(p.theme.colors.white, '10%')};
        `;
      }
      return css`
        background: ${p.theme.mixins.darken(p.theme.colors[p.view], '10%')};
      `;
    }
    return '';
  }}
  ${p => p.theme.mixins.transition('background box-shadow', '0.4s')}
`;

function makeIconSize(p) {
  const isValid = Object.keys(iconSizes).includes(p.size);
  return iconSizes[isValid ? p.size : 'default'];
}

function makePlace(p) {
  if (p.place === 'left') {
    switch (p.size) {
    case 'large': return css`
      margin-right: 12px;
    `;
    case 'small': return css`
      margin-right: 6px;
    `;
    default: return css`
      margin-right: 8px;
    `;
    }
  }
  if (p.place === 'right') {
    switch (p.size) {
    case 'large': return css`
      margin-left: 12px;
    `;
    case 'small': return css`
      margin-left: 6px;
    `;
    default: return css`
      margin-left: 8px;
    `;
    }
  }
  return '';
}

export const Icon = styled('div')`
  display: flex;
  ${makeIconSize}
  ${makePlace}
`;
