import { css } from 'emotion';
import styled from 'react-emotion';
import Text from 'react-textarea-autosize';
import { DropdownButton } from 'react-bootstrap';
import Ava from '../Avatar';

const withoutPaddingsPost = css`
    padding: 0;
`;

const normalPost = css`
    padding: 12px;
`;

export const Element = styled('div')`
    ${p => (p.paddings
        ? normalPost
        : withoutPaddingsPost)};
    position: relative;
    
    margin-bottom: 12px;
    transition: box-shadow .2s ease;
    will-change: box-shadow;

    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 7px 5px -5px rgba(0,0,0,0.1);
    background-color: white;
`;

const normalHeader = css`
    padding: 12px 12px 0 12px;
`;

const withoutPaddingsHeader = css`
    padding: 0;
`;

export const Header = styled('div')`
    ${p => (p.paddings
        ? normalHeader
        : withoutPaddingsHeader)};
    display: flex;
    align-items: center;
    position: relative;
`;

export const Avatar = styled(Ava)`
    margin-right: 16px;
`;

export const Info = styled('div')`
    position: relative;
`;

export const User = styled('a')`
    color: #d54343;
    font-weight: bold;
`;

export const Date = styled('span')`
    font-size: 12px;
    color: #666;
    display: block;
`;

export const Type = styled('span')`
    margin-left: 6px;
    cursor: help;
`;

export const Menu = styled('div')`
    margin-left: auto;
    align-self: flex-start;

    button {
        font-size: 18px !important;
        border: none;
        color: $font-color;
        width: 28px;
        padding: 0 !important;
    }
`;

export const Dropdown = styled(DropdownButton)`
    font-size: 18px !important;
    border: none;
    color: $font-color;
    width: 28px;
    padding: 0 !important;
`;

const withoutPaddingsBody = css`
    padding: 0;
`;

const normalBody = css`
    padding: 0 12px 12px;
`;

export const Body = styled('div')`
    ${p => (p.paddings
        ? normalBody
        : withoutPaddingsBody)};
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const Content = styled('div')`
    margin-top: 12px;
    white-space: pre-line;
`;

export const Textarea = styled(Text)`
    width: 100%;
    border: 1px solid #ddd;
    resize: none;
    padding: 8px 12px;
`;

export const Attachments = styled('div')`
    margin-top: 12px;
`;

export const Actions = styled('div')`
    display: flex;
    justify-content: flex-end;
    margin-top: 6px;
`;
