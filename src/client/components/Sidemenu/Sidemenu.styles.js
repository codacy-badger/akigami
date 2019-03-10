import styled from '@emotion/styled';

export const SidemenuWrapper = styled('menu')`
  padding: ${p => (p.isMobile ? '24px 9px' : '24px 16px')};
  ${p => p.theme.mixins.transition('padding')}

  > *:not(:last-child) {
    margin-bottom: 6px;
  }
`;

export default null;
