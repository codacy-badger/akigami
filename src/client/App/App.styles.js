import styled from '@emotion/styled';

const AppWrapper = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  background: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.default};
`;

export default AppWrapper;
