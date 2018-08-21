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
    if (p.overlayedDrawer) {
      return '100%';
    }
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
    if (p.overlayedDrawer) {
      return 'translate3d(0, 0, 0)';
    }
    if (p.openDrawer && p.collapsedDrawer) {
      return 'translate3d(58px, 0, 0)';
    } else if (p.openDrawer) {
      return 'translate3d(324px, 0, 0)';
    }
    return 'translate3d(0, 0, 0)';
  }};
  ${p => ((p.overlayedDrawer && p.openDrawer) && `
    user-select: none;
    pointer-events: none;
  `)};
  ${p => p.theme.mixins.transitions('transform width')}

  &:before {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    display: block;
    background: rgba(0,0,0,.32);
    opacity: ${p => ((p.overlayedDrawer && p.openDrawer) ? 1 : 0)};
    visibility:${p => ((p.overlayedDrawer && p.openDrawer) ? 'visible' : 'hidden')};
    ${p => p.theme.mixins.transitions('opacity visibility')}
    z-index: 5;
  }
`;
