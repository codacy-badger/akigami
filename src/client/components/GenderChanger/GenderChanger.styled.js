import { css } from 'emotion';
import styled from 'react-emotion';
import Ico from '../Icon';

export const Wrapper = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
`;

const maleBtn = css`
    color: dodgerblue;
`;
const femaleBtn = css`
    color: hotpink;
`;
const defaultBtn = css`
    color: inherit;
`;

export const Button = styled('button')`
    ${(p) => {
        if (p.active) {
            if (p.gender === 'male') {
                return maleBtn;
            }
            return femaleBtn;
        }
        return defaultBtn;
    }};
    background: none;
    border: none;
    font-size: 64px;

    &:hover {
        color: ${p => (p.gender === 'male' ? 'dodgerblue' : 'hotpink')};
    }
`;

export const Icon = styled(Ico)`
    display: block;
`;

export const Text = styled('p')`
    font-size: 12px;
    margin-top: -12px;
    margin-bottom: 0;
`;


export const Divider = styled('div')`
    width: 90px;
    position: relative;
`;

export const Line = styled('div')`
    width: 100%;
    height: 1px;
    background-color: #404040;
    position: absolute;
    top: 0;
    left: 0;
`;

export const DividerText = styled('p')`
    display: block;
    margin: 0;
    position: absolute;
    top: -11px;
    left: 30%;
    padding: 0 5px;
    background: white;
`;
