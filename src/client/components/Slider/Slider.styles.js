import styled from '@emotion/styled';
import { css } from '@emotion/core';

const wrapperForwardProp = (prop) => !['height'].includes(prop);
export const Wrapper = styled('div', { shouldForwardProp: wrapperForwardProp })`
  position: relative;
  ${p => (p.height && css`height: ${p.height}px;`)}
  > div {
    margin: 0 -8px;
  }
`;

export const Item = styled('div', { shouldForwardProp: wrapperForwardProp })`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  ${p => (p.height && css`height: ${p.height}px;`)}
`;

const controlForwardProp = (prop) => !['position', 'visible'].includes(prop);
export const Control = styled('div', { shouldForwardProp: controlForwardProp })`
  top: 0;
  bottom: 0;
  padding: 0 8px;
  ${p => (p.position === 'left' && css`left: 0;`)}
  ${p => (p.position === 'right' && css`right: 0;`)}
  pointer-events: ${p => (p.visible ? 'auto' : 'none')};
  opacity: ${p => (p.visible ? 1 : 0)};
  visibility: ${p => (p.visible ? 'visible' : 'hidden')};
  ${p => p.theme.mixins.transition('opacity visibility')}
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 1;
`;
