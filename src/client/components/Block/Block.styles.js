import styled from '@emotion/styled';

export default styled('div')`
  background: ${p => p.theme.colors.white};
  border-radius: ${p => p.theme.borderRadius};
  position: relative;
  margin-bottom: ${p => (p.mb ? '28px' : '0')};
  padding: ${p => (p.padded ? '16px 12px' : '0')};
  box-shadow: 0 2px 8px -4px ${p => p.theme.mixins.withOpacity(p.theme.colors.default, 0.4)};
  overflow: ${p => p.overflow};
`;
