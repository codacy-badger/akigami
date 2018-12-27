import { css } from 'emotion';
import styled from '@emotion/styled'

const bordered = css`
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
`;

const colored = css`
  background-color: white;
`;

const padded = css`
  padding: 16px;
`;

const shadow = css`
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06), 0 7px 5px -5px rgba(0, 0, 0, 0.1);
`;

export const Wrapper = styled('div')`
  ${p => p.bordered && bordered} ${p => p.shadow && shadow};
  ${p => p.colored && colored};
  ${p => p.padded && padded};
  margin-bottom: 12px;
`;

export const Header = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled('h3')`
  margin: 0;
  font-weight: bold;
  font-family: 'Proxima Nova', sans-serif;

  &:after {
    content: '';
    width: 40px;
    margin-top: 4px;
    height: 4px;
    background-color: #9b9b9b;
    display: block;
    border-radius: 4px;
  }

  @media screen and (max-width: 650px) {
    font-size: 20px;
  }
`;

export const Buttons = styled('div')`
  margin-left: auto;
`;

export const Content = styled('div')`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${p => (p.flex ? 'row' : 'column')};
  font-family: 'Proxima Nova', sans-serif;
`;
