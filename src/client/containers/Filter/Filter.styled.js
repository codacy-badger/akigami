import styled, { css } from 'react-emotion';
import { FormControl } from 'react-bootstrap';

export const Wrapper = styled('div')`
    background-color: #f7f7f7;
    border-radius: 2px;
    padding: ${props => (props.fixed ? '16px 0' : '16px')};

    display: flex;
    flex-direction: column;

    transition: padding .2s ease;
    will-change: padding;
`;

export const Header = styled('div')`
    display: flex;
    align-items: center;
`;

export const Trigger = styled('button')`
    background: none;
    border: none;
    outline: none;
    color: ${props => (props.active ? '#d54343' : '#4a4a4a')};
    font-size: 24px;
`;

export const Search = styled(FormControl)`
    background-color: transparent;
    border: none;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.2px;
`;

export const Expand = styled('div')`
    display: flex;
    flex-direction: column;
    padding: 22px 6px 8px;
`;

const defaultStyle = css`
    position: relative;
`;

const fixedStyle = css`
    position: fixed;
    top: 48px;
    left: 0;
    background-color: #f7f7f7;
`;

export const Fixer = styled('div')`
    ${props => (props.fixed ? fixedStyle : defaultStyle)};
    z-index: 10;
    width: 100%;
    transition: .2s ease;
    will-change: position, top, left, background-color;
`;
