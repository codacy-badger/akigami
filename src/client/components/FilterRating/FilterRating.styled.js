import { css } from 'emotion';
import styled from 'react-emotion';

export const Wrapper = styled('div')`
    display: flex;
    flex-direction: column;
    margin: -4px;
`;

const normal = css`
    color: #424242;
    background-color: white;
`;

const active = css`
    color: white; 
    background-color: #d54343;
`;

export const Rating = styled('button')`
    ${p => (p.active ? active : normal)};
    padding: 12px 8px;
    margin: 4px;
    border-radius: 3px;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 700;
    box-shadow: 0 5px 6px rgba(0,0,0,0.15);
    flex: 1;
`;

export const Line = styled('div')`
    display: flex;
`;
