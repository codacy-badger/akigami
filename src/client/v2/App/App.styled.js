import styled from 'react-emotion';

export const Main = styled('div')`
  position: relative;
  min-height: 100%;
  display: flex;

  font-family: ${p => p.theme.fontFamily};
  font-size: ${p => p.theme.fontSize}px;
  background-color: ${p => p.theme.colors.background};
`;

export const Content = styled('main')`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;
