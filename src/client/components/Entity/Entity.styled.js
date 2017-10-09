import styled from 'emotion/react';

export const Block = styled('div')`
    width: 100%;
    position: relative;
`;

export const Overlay = styled('div')`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 2;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    color: #fff;
    display: flex;
    flex-direction: column;
    transition: opacity .2s ease;
    will-change: opacity;
`;

export const Poster = styled('div')`
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 140%;
    margin-bottom: 10px;
    border-radius: 3px;
    position: relative;
    &:hover {
        ${Overlay} {
            opacity: 1;
        }
    }
`;

export const Image = styled('a')`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 3px;
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
    &:hover {
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
    &:hover {
        color: #d54343;
    }
`;

export const Meta = styled('div')`
    width: 100%;
    padding: 0 8px;
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
