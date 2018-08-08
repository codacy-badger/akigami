import styled from 'react-emotion';
import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
import { ListItemGraphic } from 'rmwc/List';
import { Elevation } from 'rmwc/Elevation';

export const Wrapper = styled('div')`
  width: 324px;
  flex-shrink: 0;
  position: fixed;
  height: 100%;
  transform: ${p => (p.open ? 'translate3d(0, 0, 0)' : 'translate3d(-324px, 0, 0)')};
  ${p => p.theme.mixins.transitions('transform')}
  z-index: 10;
`;

export const ThemedDrawer = styled(Drawer)`
  height: 100%;
  width: ${p => (p.mini ? 58 : 324)}px;
  background-color: ${p => p.theme.colors.drawer} !important;
  ${p => p.theme.mixins.transitions('width')}
`;

export const ThemedDrawerHeader = styled(DrawerHeader)`
  &:before {
    padding-top: 64px !important;
  }
  > div {
    padding: 8px 12px !important;
  }
`;

export const ThemedElevation = styled(Elevation)`
  height: 100%;
  width: ${p => (p.mini ? 58 : 324)}px;
  ${p => p.theme.mixins.transitions('width box-shadow')}
`;

export const ThemedList = styled(DrawerContent)`
  padding-top: 64px;
`;

export const ThemedListItemGraphic = styled(ListItemGraphic)`
`;
