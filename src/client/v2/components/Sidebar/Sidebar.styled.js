import styled from 'react-emotion';
import { Drawer, DrawerContent } from 'rmwc/Drawer';
import { ListItemGraphic } from 'rmwc/List';

export const Wrapper = styled('div')`
  width: 324px;
  flex-shrink: 0;
  position: fixed;
  height: 100%;
  transform: ${p => (p.open ? 'translate3d(0, 0, 0)' : 'translate3d(-324px, 0, 0)')};
  ${p => p.theme.mixins.transitions('transform')}
`;

export const ThemedDrawer = styled(Drawer)`
  height: 100%;
  width: 324px;
  background-color: ${p => p.theme.colors.primary} !important;
  color: ${p => p.theme.colors.textWhite};
`;

export const ThemedList = styled(DrawerContent)`
  color: ${p => p.theme.colors.textWhite};
`;

export const ThemedListItemGraphic = styled(ListItemGraphic)`
  color: rgba(255, 255, 255, 0.7) !important;
`;
