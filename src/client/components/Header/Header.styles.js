import styled from '@emotion/styled';

export const HeaderWrapper = styled('div')`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 24px;
`;

export const AutoHide = styled('div')`
  display: flex;
  @media screen and (min-width: 1280px) {
    display: none;
  }
`;

export const HiddenSearchBlock = styled('div')`
  display: ${p => (p.focused ? 'none' : 'flex')};
  width: 100%;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;
