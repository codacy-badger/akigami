import { css } from 'emotion';
import styled from 'emotion/react';
import { Button } from 'react-bootstrap';

const openned = css`
    @media screen and (max-width: 991px) {
        transform: translateX(0);
    }
`;

const closed = css`
    @media screen and (max-width: 991px) {
        transform: translateX(-280px);
    }
`;

export const Wrapper = styled('div')`
    composes: ${p => (p.open ? openned : closed)};
    height: calc(100vh - 48px);
    background-color: #424242;
    margin-left: -100vw;
    padding-left: 100vw;
    padding-right: 22px;
    color: white;
    position: relative;

    @media screen and (max-width: 991px) {
        width: 280px;
        margin-left: 0;
        padding-left: 22px;
        padding-right: 22px;
        position: fixed;
        left: 0;
        top: 48px;
        z-index: 2;
        transition: transform .2s ease;
        will-change: transform;
    }

    @media screen and (max-width: 459px) {
        width: 100%;
    }
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
        padding-top: 32px !important;
    }
`;

export const Header = styled('div')`
    width: 100%;
    display: flex;
    align-items: baseline;
`;

export const Close = styled(Button)`
    margin-left: auto;
    color: white;
    padding: 0 6px 1px;
    font-size: 22px;

    &:hover {
        color: #eee;
    }
`;

