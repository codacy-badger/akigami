import styled from 'react-emotion';

export const Wrapper = styled('div')`
    margin: -3px;
    display: flex;
    flex-wrap: wrap;
`;

export const Item = styled('a')`
    width: 14%;
    margin: 3px;
    cursor: pointer;
    opacity: 1;
    transition: opacity .2s ease;
    will-change: opacity;

    &:hover {
        opacity: 0.8;
    }
    &:active {
        opacity: 1;
    }
`;

export const Avatar = styled('img')`
    width: 100%;
`;
