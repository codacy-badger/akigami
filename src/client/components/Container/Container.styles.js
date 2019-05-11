import styled from '@emotion/styled';
import { css } from '@emotion/core';

const custom = [null, '16px', '24px', null, null];

const container = styled('div')`
  & + & {
    padding-top: 0;
  }
  ${p => p.theme.breakpoints.map((bp, i) => css`
    @media (min-width: ${bp}) {
      width: ${p.theme.containers[i]};
      ${custom[i] && css`padding: 24px ${custom[i]};`}
    }
  `)}
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding: 24px 12px;
  position: relative;
`;

export default container;
