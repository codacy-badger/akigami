import styled from 'react-emotion';
import { Grid as G, Row as R, Col as C } from 'react-bootstrap';

export const Block = styled('div')`
    position: relative;
    width: 100%;
    height: 100vh;
    
    background-color: #2d2d2d;
    background-size: cover;
    background-position: center;
    ${props => (props.image
        ? `background-image: url(${props.image});`
        : '')}

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(45,45,45,.6);
    }
`;

export const Grid = styled(G)`
    height: 100%;
`;

export const Row = styled(R)`
    height: 100%;
`;

export const Col = styled(C)`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 62px 10px;
`;

export const Footer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    margin-top: auto;
`;

export const Title = styled('h1')`
    margin: 0;
    font-size: ${(props) => {
        switch (props.size) {
        case 'medium': return 52;
        case 'small': return 42;
        default: return 64;
        }
    }}px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.3px;
    text-shadow: 0 3px 8px rgba(0,0,0,.05);
    display: block;
`;

export const Meta = styled('div')`
    display: flex;
    border-top: 1px solid rgba(255,255,255,.3);
    padding: 8px 4px;
`;

export const MetaItem = styled('a')`
    color: #fff;
    opacity: .7;
    letter-spacing: -.2px;
    text-transform: uppercase;
    font-weight: 600;

    transition: opacity .2s ease;
    will-change: opacity;

    &:not(:last-child) {
        margin-right: 12px;
    }

    &:hover {
        opacity: 1;
        color: #fff;
    }
`;

export const Stats = styled('div')`
    display: flex;
    align-items: center;
    margin-top: 24px;
    border: 1px solid #fff;
    border-radius: 2px;
`;

export const Rating = styled('div')`
    display: flex;
    align-items: center;

    background: #fff;
    color: #d54343;
    padding: 8px 22px 8px 12px;

    > i {
        line-height: 1;
        font-size: 32px;
        margin-right: 8px;
        margin-top: 2px;
    }
`;

export const Column = styled('div')`
    display: flex;
    flex-direction: column;
`;

export const Members = styled('div')`
    font-size: 12px;
    line-height: 1;
`;

export const Score = styled('div')`
    font-size: 28px;
    font-weight: 800;
    line-height: 1;
`;

export const List = styled('button')`
    background: transparent;
    border: none;
    outline: none;
    padding: 15px 16px 14px;
    transition: background .2s ease;
    will-change: background;
    > i {
        line-height: 1;
        font-size: 24px;
    }
    &:hover {
        background: #d54343;
    }
`;
