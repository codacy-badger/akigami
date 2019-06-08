import styled from '@emotion/styled';

export const Inner = styled('div')`

`;

export const Wrapper = styled('a')`
  width: 160px;
  display: block;
  text-decoration: none;
  outline: none;
  height: 100%;
  &:hover,
  &:focus,
  &:active {
    outline: none;
  }

  > div {
    height: 100%;
  }
`;

export default null;
