import { css } from 'emotion';
import styled from 'react-emotion';

export const Wrapper = styled('div')`
    height: 40px;
    position: relative;

    @media screen and (max-width: 991px) {
        height: 33px;
    }
`;

const sticky = css`
    position: relative;
    transform: translate3d(0,0,0);
    width: 100%;
    z-index: 1100;
`;

const sticked = css`
    position: fixed;
    top: 48px;
`;

export const MenuInner = styled('div')`
    ${p => p.sticky && sticky};
    ${p => p.sticked && sticked};
    background-color: #efeeeb;

    @media screen and (max-width: 767px) {
        .col-xs-12 {
            white-space: nowrap;
            overflow-x: auto;
        }
    }
`;

const normal = css`
    color: inherit;
    background: transparent;
`;

const active = css`
    color: aliceblue;
    background: #d54343;
`;

export const Item = styled('button')`
    ${p => (p.active ? active : normal)};
    border: none;
    padding: 10px 18px;
    transition: color .2s ease, background .2s ease;
    will-change: color, background;

    &:hover {
        color: aliceblue;
        background: #d54343;
    }

    @media screen and (max-width: 991px) {
        padding: 8px 14px;
        font-size: 12px;
    }
`;

export const Counter = styled('span')`
    font-size: 12px;
    margin-left: 6px;
    background-color: rgba(0,0,0,.2);
    padding: 2px 6px;
    color: white;
    border-radius: 9px;
`;

export const Title = styled('span')`

`;