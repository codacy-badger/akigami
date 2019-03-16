import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Spacer = styled('div')`
  padding: 0 12px;
  ${p => (p.full && css`flex: 1;`)}
`;

export default Spacer;
