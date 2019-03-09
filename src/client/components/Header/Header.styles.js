import styled from '@emotion/styled';

export const HeaderWrapper = styled('div')`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
`;

export const AutoHide = styled('div')`
  @media screen and (min-width: 1280px) {
    display: none;
  }
`;
