import { css } from 'emotion';
import styled from 'emotion/react';
import G from 'react-bootstrap/lib/Grid';
import R from 'react-bootstrap/lib/Row';
import C from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import Ico from '../../components/Icon';

const opaque = css`
    background-color: #d54343;
`;

const transparent = css`
    background-color: transparent;
`;

export const Head = styled('header')`
    composes: ${p => (p.transparent ? transparent : opaque)};
    color: white;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 48px;
    z-index: 1200;
    transition: background-color .2s ease;
    will-change: background-color;
    transform: translate3d(0,0,0);
`;

export const Grid = styled(G)`
    height: 48px;
`;

export const Row = styled(R)`
    height: 48px;
`;

export const Inner = styled(C)`
    height: 48px;
    display: flex;
    align-items: center;
`;

export const Logotype = styled('a')`
    display: flex;
    padding: 8px 8px 8px 0;
`;

export const Left = styled('div')`
    margin-left: 10px;
`;

export const Menu = styled('div')`
    margin: auto;
    padding: 0 20px;
    display: flex;
`;

export const Right = styled('div')`
    margin-left: auto;
`;

export const Item = styled('a')`
    color: rgba(255, 255, 255, 0.6);
    height: 48px;
    display: flex;
    align-items: center;

    &:not(:last-child) {
        margin-right: 20px;
    }

    &:hover {
        color: white;
        text-decoration: none;
    }

    &:focus,
    &:active {
        color: white;
        text-decoration: none;
    }
`;

export const Title = styled('span')`
    display: none;

    @media (min-width: 768px) {
        display: inline;
    }
`;

const normal = css`
    font-size: 20px;
`;

const large = css`
    font-size: 24px;
`;

export const Icon = styled(Ico)`
    composes: ${p => (p.large ? large : normal)};
    display: flex;
    margin-right: 4px;
`;

export const Dropdown = styled(DropdownButton)`
    padding: 0;
`;

export const Search = styled(FormControl)`
    background: transparent;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.6);
    padding: 8px 16px;
    height: 30px;
    border-radius: 100px;
    width: 160px;
    box-shadow: none;

    &:focus {
        box-shadow: none;
        border-color: $font-color-inverted;
    }

    &::-webkit-input-placeholder {color: rgba(255, 255, 255, 0.6);}
    &::-moz-placeholder {color: rgba(255, 255, 255, 0.6);}
    &:-moz-placeholder {color: rgba(255, 255, 255, 0.6);}
    &:-ms-input-placeholder {color: rgba(255, 255, 255, 0.6);}
   
    @media (min-width: 768px) {
        width: 240px;
    }

    @media (min-width: 992px) {
        width: 320px;
    }
`;

