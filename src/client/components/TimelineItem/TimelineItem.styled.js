import { css } from 'emotion';
import styled from 'react-emotion';

const inner = css`
    width: 100%;
    color: white;
    padding: 42px;
    display: flex;
    flex-direction: column;
    z-index: 2;

    @media screen and (max-width: 991px) {
        padding: 24px;
    }
`;

export const Inner = styled('div')`
    ${inner}
`;

const title = css`
    font-size: 28px;
    letter-spacing: 0.35px;
    margin: 0;

    @media screen and (max-width: 991px) {
        font-size: 16px;
        letter-spacing: 0.2px;
    }
`;

export const Title = styled('h1')`
    ${title}
`;

const time = css`
    display: block;
    font-size: 24px;
    font-weight: bold;
    margin-top: auto;
    margin-bottom: 0;

    @media screen and (max-width: 991px) {
        font-size: 18px;
        margin-top: auto;
    }
`;

export const Time = styled('p')`
    ${time}
`;

const tags = css`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: -5px;
    margin-top: 24px;

    @media screen and (max-width: 991px) {
        margin: -3px;
        margin-top: 12px;
    }
`;
export const Tags = styled('div')`
    ${tags}
`;

const tag = css`
    color: white;
    display: block;
    margin: 5px;
    padding: 3px 6px;
    background-color: rgba(213, 67, 67, 0.7);
    border-radius: 100px;

    @media screen and (max-width: 991px) {
        padding: 2px 6px;
        font-size: 11px;
        margin: 3px;
    }
`;

export const Tag = styled('span')`
    ${tag}
`;

export const Item = styled('a')`
    display: flex;
    width: 50%;
    height: 300px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;

    &:after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(40, 40, 40, 0.7);
        transition: background-color .2s ease;
        will-change: background-color;
        z-index: 1;
    }

    &:hover {
        &:after {
            background-color: rgba(40, 40, 40, 0.5);
        }
    }

    &:nth-child(2) {
        width: 50%;
    }

    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
        width: 25%;
        height: 180px;
        
        .${inner} {
            padding: 24px;

            .${title} {
                font-size: 16px;
                letter-spacing: 0.2px;
            }

            .${time} {
                font-size: 18px;
                margin-top: auto;
            }
        }

        .${tags} {
            margin: -3px;
            margin-top: 12px;

            .${tag} {
                padding: 2px 6px;
                font-size: 11px;
                margin: 3px;
            }
        }
    }

    &:first-child {
        border-radius: 8px 0 0 0;
    }
    
    &:nth-child(2) {
        border-radius: 0 8px 0 0;
    }
    
    &:nth-child(3) {
        border-radius: 0 0 0 8px;
    }
    
    &:last-child {
        border-radius: 0 0 8px 0;
    }

    @media screen and (max-width: 1199px) {
        &:nth-child(6) {
            display: none;
        }
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5) {
            width: 33.33%;
        }
        &:nth-child(5) {
            border-radius: 0 0 8px 0;
        }
    }

    @media screen and (max-width: 991px) {
        height: 180px;

        &:nth-child(6),
        &:nth-child(5) {
            display: none;
        }
        &:nth-child(3),
        &:nth-child(4) {
            width: 50%;
        }
        &:nth-child(4) {
            border-radius: 0 0 8px 0;
        }
    }

    @media screen and (max-width: 766px) {
        width: 100% !important;

        &:nth-child(3),
        &:nth-child(4) {
            display: none;
        }
        &:first-child {
            border-radius: 8px 8px 0 0;
        }
        &:nth-child(2) {
            border-radius: 0 0 8px 8px;
        }
    }
`;
