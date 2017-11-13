import styled, { css } from 'react-emotion';

export const Block = styled('div')`
    width: 100%;
    position: relative;

    &:hover {
        > div:first-child {
            box-shadow: 0 22px 50px rgba(14,21,47,.2), 0 8px 20px rgba(14,21,47,.2);
        }
    }
`;

export const Label = styled('article')`
    left: -8px;
    width: 0;
    border-radius: 2px 0 0 2px;
    padding: 2px 0 2px 8px;

    position: absolute;
    color: #fff;
    top: 14px;
    left: -8px;
    overflow: hidden;
    white-space: nowrap;
    z-index: 3;
    width: 0;
    border-radius: 3px 0 0 3px;
    padding: 2px 0 2px 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.2px;

    transition: width .1s ease, left .1s ease, border-radius .1s ease, padding .1s ease;
    will-change: width, left, border-radius, padding;

    background-color: ${e => (e.color ? e.color : '#2d2d2d')};
`;

const overlay = css`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 2;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    color: #fff;
    display: flex;
    flex-direction: column;
    transition: opacity .2s ease;
    will-change: opacity;

    > div:first-child {
        display: flex;
        flex: 1;
        > button {
            display: flex;
            flex: 1;
        }
    }
`;

export const Overlay = styled('div')`
    ${overlay}
`;

export const ModalTrigger = styled('button')`
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
`;

export const Poster = styled('div')`
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 140%;
    margin-bottom: 10px;
    border-radius: 2px;
    position: relative;
    transition: box-shadow .2s ease;
    will-change: box-shadow;
    &:hover {
        .${overlay} {
            opacity: 1;
        }
        > article {
            left: 0;
            width: auto;
            border-radius: 0 2px 2px 0;
            padding: 2px 8px;
        }
    }
`;

export const Image = styled('div')`
    width: 100%;
    height: 100%;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    border-radius: 2px;
    background-color: grey;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
`;

export const Info = styled('div')`
    display: flex;
    flex-direction: column;
`;

export const Title = styled('a')`
    display: block;
    font-size: 13px;
    font-weight: 700;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #404040;
    text-align: left;
`;

export const Genres = styled('div')`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 8px 8px;
`;

export const Genre = styled('a')`
    font-size: 12px;
    color: #fff;
    font-weight: 600;
    opacity: .7;
    &:hover,
    &:focus {
        color: #fff;
        opacity: 1;
    }
    &:not(:last-child):after {
        content: ',';
        margin-right: 4px;
    }
`;

export const Studio = styled('a')`
    font-size: 11px;
    color: #666;
    margin-right: auto;
    text-align: left;
    &:hover {
        color: #d54343;
    }
`;

export const Meta = styled('div')`
    width: 100%;
    padding: 0 8px;
    text-align: left;
`;

export const Link = styled('a')`
    flex: 1;
`;

export const MetaItem = styled('span')`
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 2px;
    &:not(:last-child) {
        margin-right: 3px;
    }
`;

export const Button = styled('button')`
    font-size: 24px;
    background: transparent;
    outline: none;
    border: none;
    color: #fff;
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 0 4px;
    &:hover {
        color: #f5d006;
    }
`;
