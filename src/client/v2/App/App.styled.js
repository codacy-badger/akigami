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
  width: ${(p) => {
    if (p.openDrawer && p.collapsedDrawer) {
      return 'calc(100% - 58px)';
    } else if (p.openDrawer) {
      return 'calc(100% - 324px)';
    }
    return '100%';
  }};
  position: relative;
  display: flex;
  flex-direction: column;
  transform: ${(p) => {
    if (p.openDrawer && p.collapsedDrawer) {
      return 'translate3d(58px, 0, 0)';
    } else if (p.openDrawer) {
      return 'translate3d(324px, 0, 0)';
    }
    return 'translate3d(0, 0, 0)';
  }};
  ${p => p.theme.mixins.transitions('transform width')}
`;
