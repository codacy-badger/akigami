import styled from '@emotion/styled'

export const Image = styled('div')`
  background-size: cover;
  background-position: center;
  background-color: #424242;
  border-radius: 100vw;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-image: url(${({ src }) => src});
`;

export default Image;
