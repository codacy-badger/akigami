import styled from '@emotion/styled';

export const LayoutWrapper = styled('main')`
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const LayoutSidenav = styled('section')`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: ${p => p.theme.colors.sidenav};
  width: 320px;
  box-shadow: inset -12px 0 24px -12px #ccc;
  overflow: hidden;
`;

export const LayoutHeader = styled('header')`
  position: fixed;
  top: 0;
  width: ${p => p.width}px;
  height: 54px;
  border-bottom: 1px solid ${p => p.theme.colors.sidenav};
  background: ${p => p.theme.colors.background};
`;

export const LayoutContent = styled('section')`
  padding: 54px 0 0 320px;
  flex: 1;
`;
