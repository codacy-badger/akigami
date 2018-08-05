import styled from 'react-emotion';
import { TopAppBar } from 'rmwc/TopAppBar';

export const ThemedTopAppBar = styled(TopAppBar)`
  position: sticky;
  background-color: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.textDark};
`;