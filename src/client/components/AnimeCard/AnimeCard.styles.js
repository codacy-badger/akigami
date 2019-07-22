import styled from '@emotion/styled';

export const Inner = styled('div')`
  padding: 8px 6px;
`;

export const Title = styled('div')`
  font-weight: 600;
  color: ${p => p.theme.colors.default};
  font-size: 15px;
  line-height: 1.2;
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
