import styled from 'react-emotion';
import { TopAppBar } from 'rmwc/TopAppBar';
/* eslint-disable */
export const ThemedTopAppBar = styled(TopAppBar)`
  position: sticky;
  background-color: ${p => (p.transparent ? 'transparent' : p.theme.colors.background)};
  color: ${p => p.theme.colors.textDark};
  top: 0;
`;