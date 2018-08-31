import styled from 'react-emotion';
import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
import { ListItem, ListItemGraphic } from 'rmwc/List';
import { Elevation } from 'rmwc/Elevation';
import { Scrollbars } from 'react-custom-scrollbars';

export const Title = styled('span')`
  font-weight: bold;
  font-size: 18px;
  padding-left: 18px;
  text-transform: uppercase;
  letter-spacing: .6px;
`;

export const Wrapper = styled('div')`
  width: ${p => (p.collapsed ? '58px' : '324px')};
  display: flex;
  flex-shrink: 0;
  position: fixed;
  height: 100%;
  border-right: 1px solid ${p => (p.collapsed ? 'transparent' : '#e4e4e4')};
  background-color: ${p => p.theme.colors.white};
  transform: ${p => (p.open ? 'translate3d(0, 0, 0)' : 'translate3d(-324px, 0, 0)')};
  ${p => p.theme.mixins.transitions('transform width border-right')}
  z-index: 10;
`;

export const ThemedDrawer = styled(Drawer)`
  height: 100%;
  width: ${p => (p.mini ? 58 : 324)}px;
  border-right-color: ${p => (p.mini ? '#e4e4e4' : 'transparent')} !important;
  background-color: ${p => p.theme.colors.white} !important;
  color: ${p => p.theme.colors.textDark};
  user-select: none;

  ${p => p.theme.mixins.transitions('width')}
`;

export const ThemedDrawerHeader = styled(DrawerHeader)`
  /* border-bottom: 1px solid ${p => p.theme.colors.darkBorder}; */

  &:before {
    padding-top: 64px !important;
  }

  > div {
    padding: 8px 13px !important;
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
  color: ${p => p.theme.colors.textDark};
  padding-top: 64px;
`;

export const ThemedListItem = styled(ListItem)`
  margin: 8px 8px;
  padding: 0 8px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
`;


export const ThemedListItemGraphic = styled(ListItemGraphic)`
  /* color: rgba(255, 255, 255, 0.8) !important; */
`;

export const AdditionalContent = styled('div')`
  position: relative;
  padding: 16px;
  width: 266px;
  box-sizing: border-box;
`;
