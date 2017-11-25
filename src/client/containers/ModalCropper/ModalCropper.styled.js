import { css } from 'emotion';
import styled from 'react-emotion';

const avatar = css`
    width: 200px;
    height: 200px;
    borderRadius: 50%;
`;

const cover = css`
    width: 476px;
    height: 112px;
`;

export const PreviewImage = styled('div')`
    ${p => (p.type === 'avatar' ? avatar : cover)};
    overflow: hidden;
`;

export const leet = 133;
