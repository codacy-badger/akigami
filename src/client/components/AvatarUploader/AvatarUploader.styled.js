import Dropzone from 'react-dropzone';
import styled from 'react-emotion';
import I from '../Icon';

export const Wrapper = styled('div')`
    width: ${({ size }) => size + 4}px;
    height: ${({ size }) => size + 4}px;
    border-radius: 100px;
    padding: 2px;
    box-shadow: 0 0 0 2px #666;
    margin-bottom: 24px;
    position: relative;
`;

export const Replacer = styled('button')`
    position: absolute;
    left: 2px;
    top: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 100px;
    border: none;
    background-color: rgba(213, 67, 67, 0.4);
    transition: background-color .2s ease;
    will-change: background-color;
    color: white;
    font-size: 12px;
    padding: 4px;
    width: calc(100% - 4px);

    &:hover {
        background-color: rgba(213, 67, 67, 1.0);
    }
`;

export const Zone = styled(Dropzone)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #666;
    background-color: white;
    transition: color .2s ease;
    will-change: color;
    border-radius: 100px;
    cursor: pointer;

    &:hover {
        color: $font-color;
    }
`;

export const Icon = styled(I)`
    font-size: 42px;
    display: flex;
    margin: -8px 0;
`;

export const Title = styled('p')`
    margin: 0;
    font-size: 12px;
`;
