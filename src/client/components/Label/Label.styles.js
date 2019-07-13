import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const types = {
  solid: ({ theme: { colors } }) => css`
    background: ${colors.brand};
    color: ${colors.white};
  `,
  border: ({ theme: { colors } }) => css`
    background: transparent;
    color: ${colors.brand};
    border-color: ${colors.brand};
  `,
};

export function makeType(p) {
  const isValid = Object.keys(types).includes(p.type);
  return types[isValid ? p.type : 'border'];
}

export default styled('div')`
  font-size: 11px;
  padding: 3px 6px;
  border-radius: ${p => p.theme.borderRadiusCircle};
  border: 1px solid transparent;
  ${makeType}
  ${p => p.theme.mixins.transition('border-color background color')}
`;
