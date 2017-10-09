import styled from 'emotion/react';
import Button from 'react-bootstrap/lib/Button';

export const Content = styled('div')`
    position: relative;
    display: flex;
    flex-wrap: wrap;
`;

export const Header = styled('div')`
    display: flex;
    align-items: baseline;
`;

export const Switch = styled(Button)`
    margin-right: 16px;
    padding: 0 6px;
    font-size: 24px;
    color: #424242;

    &:hover {
        color: #d54343;
    }

    @media screen and (max-width: 650px) {
        margin-right: 6px;
        font-size: 18px;
    }
`;

export const Title = styled('h1')`
    margin: 0;
    font-weight: bold;
    margin: 32px 0;

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

export const Grid = styled('div')`
    display: flex;
    flex-wrap: wrap;
    margin: -12px;

    > div {
        margin: 12px;
    }
`;
