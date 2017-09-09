import { css } from 'emotion';
import styled from 'emotion/react';
import Text from 'react-textarea-autosize';
import { Button } from 'react-bootstrap';
import Ava from '../Avatar';

export const Actions = styled('div')`
    margin-left: auto;
    opacity: 0;
    transition: opacity .2s ease;
    will-change: opacity;
`;

const replied = css`
    padding-bottom: 12px;
    border-bottom: 1px solid #ddd !important;
    margin-bottom: 12px !important;

    &:last-child {
        border-bottom: none !important;
        margin-bottom: 0 !important;
    }
`;

const replies = css`
    &:after {
        content: '';
        position: absolute;
        width: 1px;
        height: 100%;
        background: #ddd;
        left: 2.6rem;
    }
`;

const none = css`
    padding-bottom: 12px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 12px;
`;

export const Wrapper = styled('article')`
    composes:
        ${p => (p.replied ? replied : none)}
        ${p => p.replies && replies};

    display: flex;
    flex-direction: column;
    position: relative;

    padding-left: 12px;
    padding-right: 12px;


    overflow: hidden;

    &:first-child {
        padding-top: 12px;
    }

    &:nth-last-child(2),
    &:nth-last-child(1) {
        border-bottom: none;
        margin-bottom: 0;
    }

    &:hover {
        ${Actions} {
            opacity: 1;
        }
    }
`;

export const Main = styled('div')`
    display: flex;
`;

export const Info = styled('div')`
    position: relative;
    width: 100%;
`;

const noneAvatar = css`
    box-shadow: 0 0 0 4px #fafafa;
`;

const repliedAvatar = css`
    box-shadow: 0 0 0 4px #f6f5f3;
`;

export const Avatar = styled(Ava)`
    composes: ${p => (p.replied ? repliedAvatar : noneAvatar)};
    z-index: 2;
    margin-right: 12px;
    flex-shrink: 0;
`;

export const Replies = styled('div')`
    background-color: #f6f5f3;
    margin-left: 30px;
    margin-top: 6px;
`;

export const Body = styled('div')`
    position: relative;
`;

export const User = styled('a')`
    color: #d54343;
    font-size: 13px;
    font-weight: 600;
    margin-right: 6px;
    transition: color .2s ease;
    will-change: color;

    &:hover {
        color: #c33e3e;
    }
`;

export const Content = styled('span')`
    white-space: pre-line;
    font-size: 13px;
`;

export const Textarea = styled(Text)`
    width: 100%;
    border: 1px solid #ddd;
    resize: none;
    padding: 8px 12px;
`;

export const Meta = styled('div')`
    display: flex;
    align-items: baseline;
    font-size: 10px;
    margin-top: 4px;
    font-size: 75%;
`;


export const Reply = styled(Button)`
    padding: 2px 0;
    line-height: 10px;
    font-size: 100%;
    color: #424242;
    transition: color .2s ease;
    will-change: color;
    text-decoration: none;

    &:hover {
        color: #d54343;
        text-decoration: none;
    }

    &:active {
        color: #c33e3e;
        text-decoration: none;
    }
`;

export const Date = styled('span')`
    color: #999;
    margin: 0 6px;
`;

export const Action = styled(Button)`
    color: #9b9b9b;
    padding: 0;
`;