import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Scrollbars } from 'react-custom-scrollbars';

const shouldForwardProp = (prop) => {
  return !['autoWidth', 'horizontalScroll', 'lockScroll'].includes(prop);
};

export const Wrapper = styled('div')`
  position: relative;
`;

export const Scroll = styled(Scrollbars, { shouldForwardProp })`
  width: 100%;
`;

export const Inner = styled('div')`
  display: flex;
  margin: 0 -6px;
  position: relative;
`;

export const Item = styled('div')`
  flex-shrink: 0;
  padding: 4px 6px 16px;
  &:last-child {
    padding-right: 24px;
  }
`;

export const Shade = styled('div')`
  z-index: 1;
  position: absolute;
  top: 0;
  ${p => p.position}: 0;
  bottom: 16px;
  width: ${p => p.reach}px;
  ${p => `
    background: linear-gradient(
      to ${(p.position === 'left' ? 'right' : 'left')},
      ${p.theme.mixins.withOpacity(p.color || p.theme.colors.background, 1)} 0%,
      ${p.theme.mixins.withOpacity(p.color || p.theme.colors.background, 0)} 100%
    );
  `}
  opacity: ${p => (p.visible ? 1 : 0)};
  visibility: ${p => (p.visible ? 'visible' : 'hidden')};

  ${p => p.theme.mixins.transition('opacity visibility')}
`;

export const Control = styled('div')`
  top: 0;
  bottom: 0;
  padding: 0 24px;
  ${p => (p.position === 'left' && css`left: 0;`)}
  ${p => (p.position === 'right' && css`right: 0;`)}
  opacity: ${p => (p.visible ? 1 : 0)};
  visibility: ${p => (p.visible ? 'visible' : 'hidden')};
  ${p => p.theme.mixins.transition('opacity visibility')}
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 1;
`;
