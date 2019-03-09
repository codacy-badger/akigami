import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const SidenavWrapper = styled('nav')`
  box-shadow: 1px 0 0 ${p => p.theme.colors.border};
  min-width: 64px;
  max-width: 320px;
  height: 100%;

  ${p => (p.isMini && css`
    width: 64px;
  `)}
`;

export const LogoWrapper = styled('a')`
  display: block;
  appearance: none;
  padding: ${(p) => {
    if ((p.isMiniSidenav || p.isOpenSidenav) || !p.isMobile) return '22px 24px';
    if (!(p.isMiniSidenav || p.isOpenSidenav) && p.isMobile) return '22px 14px';
    return '';
  }};
  outline: none !important;
  transform: scale3d(1, 1, 1);
  ${p => p.theme.mixins.transition('transform padding')}
  &:active {
    transform: scale3d(.98, .98, 1);
  }
`;
