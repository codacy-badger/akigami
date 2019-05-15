import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const LayoutWrapper = styled('main')`
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1280px) {
    &:after {
      content: '';
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .4);
      opacity: 0;
      visibility: hidden;
      z-index: 2;
      ${p => p.theme.mixins.transition('opacity visibility')}
    }
  }

  ${p => (p.isOpenSidenav && css`
    @media screen and (max-width: 1280px) {
      &:after {
        opacity: 1;
        visibility: visible;
      }
    }
  `)}
`;

export const LayoutSidenav = styled('section')`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  display: flex;
  transform: translate3d(-321px, 0, 0);
  overflow: hidden;
  z-index: 3;
  background: ${p => p.theme.colors.sidenav};
  border-radius: ${p => `0 ${p.theme.borderRadius} ${p.theme.borderRadius} 0`};
  /* border-right: 1px solid ${p => p.theme.colors.border}; */
  height: 100%;
  ${p => p.theme.mixins.transition('width transform')}

  > nav {
    background: ${p => p.theme.colors.sidenav};
  }

  @media screen and (min-width: 768px) {
    width: 64px;
    transform: translate3d(0, 0, 0);
  }
  @media screen and (min-width: 1280px) {
    width: 320px;
  }

  ${p => (p.isOpen && css`
    @media screen and (max-width: 1280px) {
      width: 320px !important;
      transform: translate3d(0, 0, 0) !important;
    }
    @media screen and (min-width: 1280px) {
      width: 64px;
    }
  `)}
`;

export const LayoutHeader = styled('header')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 68px;
  z-index: 2;
  background: ${p => (p.isTransparent ? 'none' : p.theme.colors.background)};
  ${p => p.theme.mixins.transition('margin-left')}
  > div {
    margin-left: 0;
    @media screen and (min-width: 768px) {
      margin-left: 64px;
    }
    @media screen and (min-width: 1280px) {
      margin-left: 320px;
    }
    ${p => (p.isOpenSidenav && css`
      @media screen and (min-width: 1280px) {
        margin-left: 64px;
      }
    `)}
  }
`;

export const LayoutContent = styled('section')`
  padding-top: ${p => (p.isTransparented ? 0 : '68px')};
  padding-left: 0;
  ${p => p.theme.mixins.transition('padding-left')}
  @media screen and (min-width: 768px) {
    padding-left: 64px;
  }
  @media screen and (min-width: 1280px) {
    padding-left: 320px;
  }
  ${p => (p.isOpenSidenav && css`
    @media screen and (min-width: 1280px) {
      padding-left: 64px;
    }
  `)}
  flex: 1;
  display: flex;
  flex-direction: column;
`;
