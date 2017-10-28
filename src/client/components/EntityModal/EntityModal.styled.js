import styled, { css } from 'react-emotion';

export const Poster = styled('div')`
    border-radius: 2px 0 0 2px;
    width: 320px;
    height: 470px;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    background-color: grey;
    object-fit: cover;
    flex-shrink: 0;
`;

export const ModalContent = styled('div')`
    display: flex;
    width: 800px;
    height: 470px;
`;

export const Info = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Head = styled('div')`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    background-color: #fff;
    border-radius: 2px;
    margin: 34px 52px 24px -32px;
    padding: 16px 24px;
    box-shadow: 0 12px 82px rgba(150, 150, 150, 0.25);
`;

export const Title = styled('h1')`
    margin: 0 0 16px;
    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;
    color: #4a4a4a;
    line-height: 1.2;
    letter-spacing: 0.3px;
`;

export const Meta = styled('div')`
    display: flex;
    flex-wrap: wrap;
`;

export const Genres = styled('div')`
    display: flex;
    flex-wrap: wrap;
`;

export const Genre = styled('a')`
    color: #d54343;
    font-weight: 600;
    letter-spacing: 0.2px;
    border-bottom: 1px solid transparent;

    transition border-color .2s ease;
    will-change: border-color;

    &:not(:last-child):after {
        content: ',';
        margin-right: 4px;
    }

    &:hover {
        border-color: #d3d3d3;
    }
`;

export const Tags = styled('div')`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: auto;
`;

export const Studio = styled('a')`
    background-color: #f6f5f3;
    color: #7b7c7d;
    font-size: 14px;
    padding: 2px 10px;
    font-weight: 600;
    border-radius: 25px;
    display: flex;

    transition background-color .2s ease, color .2s ease;
    will-change: background-color, color;

    &:hover {
        background-color: #d54343;
        color: #fff;
    }
`;

export const Content = styled('div')`

`;

export const Description = styled('p')`
    margin: 0;
    padding: 0 24px;
    font-size: 16px;
    font-weight: 300;
    white-space: pre-wrap;
`;

export const More = styled('a')`
    padding: 12px 24px;
    display: flex;
    font-size: 16px;
    align-items: center;
    color: #d48181;

    transition: color .2s ease;
    will-change: color;

    > i {
        font-size: 22px;
        margin: 0 0 -3px 6px;
    }

    &:hover {
        color: #d54343;
    }
`;

export const Footer = styled('div')`
    display: flex;
    margin-top: auto;

    > *:last-child {
        border-radius: 0 0 2px 0;
    }
`;

export const FooterLink = styled('a')`
    background-color: #d54343;
    color: #fff;

    flex: 1;
    text-align: center;
    display: flex;
    border: none;
    outline: none;
    padding: 14px;
    font-size: 16px;

    justify-content: center;
    align-items: center;

    transition: background-color .2s ease;
    will-change: background-color;

    > i {
        font-size: 24px;
        margin-left: 6px;
    }

    &:hover,
    &:focus {
        color: #fff;
        background-color: #b32d2d;
    }
`;

export const FooterButton = styled('button')`
    background-color: #2d2d2d;
    color: #fff;

    flex: 1;
    text-align: center;
    display: flex;
    border: none;
    outline: none;
    padding: 14px;
    font-size: 16px;

    justify-content: center;
    align-items: center;

    transition: background-color .2s ease;
    will-change: background-color;

    > i {
        font-size: 24px;
        margin-left: 6px;
        margin-top: 3px;
    }

    &:hover,
    &:focus {
        color: #fff;
        background-color: #1f1f1f;
    }
`;