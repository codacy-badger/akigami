import styled from 'react-emotion';

export const Item = styled('div')`
    display: flex;
    align-items: center;
    padding: 4px 0;
    &:not(:last-child) {
        margin-right: 6px;
    }
`;

export const Title = styled('span')`
    font-weight: bold;
    font-size: 12px;
    line-height: 0;
`;

export const Dot = styled('div')`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
`;
