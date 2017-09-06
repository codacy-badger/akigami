import { css } from 'emotion';
import styled from 'emotion/react';

export const Box = styled('div')`
    display: flex;
    flex-direction: column;
    border: 1px solid #9b9b9b;
    border-radius: 3px;
`;

const defaultItem = css`
    background-color: transparent;
`;

const pHoverItem = css`
    background-color: rgba(72, 166, 38, 0.3);
    &:active {
        background-color: rgba(72, 166, 38, 0.5);
    }
`;

const nHoverItem = css`
    background-color: rgba(166, 38, 38, 0.5);
    &:active {
        background-color: rgba(166, 38, 38, 0.5);
    }
`;

const pActiveItem = css`
    background-color: rgba(72, 166, 38, 0.3);
`;

const nActiveItem = css`
    background-color: rgba(166, 38, 38, 0.3);
`;

export const Item = styled('div')`
    compose: ${defaultItem}
        ${p => p.positiveHover && pHoverItem}
        ${p => p.negativeHover && nHoverItem}
        ${p => p.positiveActive && pActiveItem}
        ${p => p.negativeActive && nActiveItem};

    display: flex;
    transition: background-color, .2s ease;
    will-change: background-color;

    &:not(:last-child) {
        border-bottom: 1px solid #9b9b9b;
    }
`;

export const Add = styled('button')`
    width: 100%;
    text-align: left;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 6px 12px;
`;

export const Del = styled('button')`
    margin-left: auto;
    background-color: transparent;
    border: none;
    padding: 6px 12px;
`;
