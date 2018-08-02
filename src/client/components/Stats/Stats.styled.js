import styled from 'react-emotion';

export const Block = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:not(:last-child) {
    padding-bottom: 6px;
  }
`;

export const Title = styled('h5')`
  letter-spacing: 0.3px;
  position: relative;
  margin-top: 0;
  width: 100%;
  z-index: 1;
`;
