import styled from 'react-emotion';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export const Category = styled('div')`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export const Title = styled('h5')`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
`;

export const Items = styled('div')`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: -3px;
`;

export const Favorite = styled('a')`
  margin: 3px;
  width: 20%;
  transition: opacity 0.2s ease;
  will-change: opacity;
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 1;
  }
`;

export const Image = styled('img')`
  width: 100%;
  border-radius: 3px;
`;
