import styled from 'react-emotion';
import { Grid as G, Row as R, Col as C } from 'react-bootstrap';

export const Block = styled('div')`
    position: relative;
    width: 100%;
    height: 600px;
    
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
        background-color: rgba(45,45,45,.4);
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
`;

export const Content = styled('div')`
    display: flex;
    flex-direction: row;
    color: #fff;
    margin-top: 120px;
`;

export const Left = styled('div')`
    width: 70%;
    display: flex;
    flex-direction: column;
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
    margin-right: auto;
`;

export const MetaItem = styled('a')`
    color: #fff;
    opacity: .7;
    letter-spacing: -.2px;
    text-transform: uppercase;

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
