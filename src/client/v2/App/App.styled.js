import styled from 'react-emotion';

export const Main = styled('div')`
  position: relative;
  min-height: 100%;
  display: flex;

  font-family: ${p => p.theme.fontFamily};
  font-size: ${p => p.theme.fontSize}px;
  background-color: ${p => p.theme.colors.background};
`;

export const Content = styled('main')`
  width: ${p => (p.openDrawer ? 'calc(100% - 324px)' : '100%')};
  position: relative;
  display: flex;
  flex-direction: column;
  transform: ${p => (p.openDrawer ? 'translate3d(324px, 0, 0)' : 'translate3d(0, 0, 0)')};
  ${p => p.theme.mixins.transitions('transform width')}
`;
