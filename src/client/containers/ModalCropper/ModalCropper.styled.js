import { css } from 'emotion';
import styled from 'react-emotion';

const avatar = css`
    width: 120px !important;
    height: 120px !important;
    border-radius: 50% !important;
`;

const cover = css`
    width: 476px !important;
    height: 112px !important;
`;

export const PreviewImage = styled('div')`
    ${p => (p.type === 'avatar' ? avatar : cover)};
    overflow: hidden;
    margin-bottom: 32px;
`;

export const leet = 133;


export const Wrapper = styled('div')`
    padding: 28px 32px;
    max-width: 540px;
`;

export const Title = styled('h2')`
    font-weight: 800;
    margin-bottom: 30px;
    margin-top: 0;
`;

export const Sub = styled('div')`
    margin-bottom: 2px;
    font-size: 18px;
    font-weight: 600;
`;

export const Help = styled('div')`
    font-size: 12px;
    font-style: italic;
    margin-bottom: 12px;
`;

export const Actions = styled('div')`
    display: flex;
    justify-content: center;
    padding: 0 32px 32px;

    > *:not(:last-child) {
        margin-right: 12px;
    }
`;
