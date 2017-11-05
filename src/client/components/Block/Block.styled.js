import { css } from 'emotion';
import styled from 'react-emotion';

const bordered = css`
    padding: 16px;
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.06);
    background-color: white;
`;

const shadow = css`
    box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 10px 20px -5px rgba(0,0,0,0.4);
`;

export const Wrapper = styled('div')`
    ${p => p.bordered && bordered}
    ${p => p.shadow && shadow};
    margin-bottom: 22px;
`;

export const Header = styled('div')`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

export const Title = styled('h3')`
    margin: 0;
    font-weight: bold;

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
`;
