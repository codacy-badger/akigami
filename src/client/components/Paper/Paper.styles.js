import styled from '@emotion/styled';
import { css } from '@emotion/core';

const paper = styled('div')`
  position: relative;
  border-radius: ${p => p.theme.borderRadius};
  background: ${p => p.theme.colors.white};
  overflow: ${p => p.overflow};
  ${p => (p.shadow && css`
    box-shadow: ${p.theme.shadow};
  `)}
`;

export default paper;
