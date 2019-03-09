import styled from '@emotion/styled';
import { views, makeView } from '../Button.styles';

function makeState(p) {
  switch (p.state) {
  case 'processing': return makeView;
  case 'success': return views.success;
  case 'error': return views.danger;
  default: return '';
  }
}

function makeBorder(p) {
  let borderValue = 'none';
  if (p.state === 'processing' && ['default', 'disable'].includes(p.view)) {
    borderValue = '1px solid transparent';
  }
  return `border: ${borderValue};`;
}

export const State = styled('div')`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  ${makeBorder}
  border-radius: ${p => p.theme.borderRadius};
  font-family: ${p => p.theme.fontFamily};
  ${makeState}
  box-sizing: border-box;
  padding: 0 !important;

  opacity: 0;
  ${p => p.theme.mixins.transition('opacity', '.2s', 'ease-in-out')}
`;

export const Wrapper = styled('div')`
  position: relative;
  display: inline-block;
  pointer-events: ${p => (p.events ? 'initial' : 'none')};
`;
