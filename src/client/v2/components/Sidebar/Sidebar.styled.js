import styled from 'react-emotion';
import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
import { ListItemGraphic } from 'rmwc/List';
import { Elevation } from 'rmwc/Elevation';
import { Scrollbars } from 'react-custom-scrollbars';

export const Title = styled('span')`
  font-weight: bold;
  font-size: 20px;
  padding-left: 18px;
  letter-spacing: .6px;
`;


export const Wrapper = styled('div')`
  width: 324px;
  flex-shrink: 0;
  position: fixed;
  height: 100%;
  border-right: 1px solid #e4e4e4;
  background-color: ${p => p.theme.colors.white};
  transform: ${p => (p.open ? 'translate3d(0, 0, 0)' : 'translate3d(-324px, 0, 0)')};
  ${p => p.theme.mixins.transitions('transform')}
  z-index: 10;
`;

export const ThemedDrawer = styled(Drawer)`
  height: 100%;
  width: ${p => (p.mini ? 58 : 324)}px;
  border-right: none !important;
  background-color: ${p => p.theme.colors.dark} !important;
  color: ${p => p.theme.colors.textWhite};

  ${p => p.theme.mixins.transitions('width')}
`;

export const ThemedDrawerHeader = styled(DrawerHeader)`
  border-bottom: 1px solid ${p => p.theme.colors.darkBorder};

  &:before {
    padding-top: 64px !important;
  }

  > div {
    padding: 8px 11px !important;
    align-items: center !important;
  }
`;

export const ThemedScrollbars = styled(Scrollbars)`
  flex: 1;
`;


export const ThemedElevation = styled(Elevation)`
  height: 100%;
  width: ${p => (p.mini ? 58 : 324)}px;
  ${p => p.theme.mixins.transitions('width box-shadow')}
`;

export const ThemedList = styled(DrawerContent)`
  color: ${p => p.theme.colors.textWhite};
  padding-top: 64px;
`;

export const ThemedListItemGraphic = styled(ListItemGraphic)`
  color: rgba(255, 255, 255, 0.8) !important;
`;
