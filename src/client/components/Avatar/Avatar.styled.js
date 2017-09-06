import styled from 'emotion/react';

export const Image = styled('div')`
    background-size: cover;
    background-position: center;
    background-color: #424242;
    border-radius: 100px;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    background-image: url(${({ src }) => src});
`;

export default Image;
