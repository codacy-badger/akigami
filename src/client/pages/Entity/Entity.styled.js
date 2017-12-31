import styled from 'react-emotion';

export const Grid = styled('div')`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: 0px -6px;
`;

export const LeftColumn = styled('div')`
    width: 30%;
    min-width: 110px;
    position: relative;
    padding: 0 6px;

    @media screen and (min-width: 592px) {
        width: 200px;
    }
`;

export const AutoColumn = styled('div')`
    width: auto;
    position: relative;
    padding: 0 6px;
    flex: 1;
`;

export const CenterColumn = styled('div')`
    width: 100%;
    position: relative;
    padding: 0 6px;

    @media screen and (min-width: 768px) {
        width: 550px;
    }

    @media screen and (min-width: 992px) {
        width: 770px;
    }

    @media screen and (min-width: 1200px) {
        width: 560px;
    }
`;

export const RightColumn = styled('div')`
    width: 100%;
    position: relative;
    padding: 0 6px;

    @media screen and (min-width: 768px) {
        width: 550px;
    }

    @media screen and (min-width: 992px) {
        width: 385px;
    }

    @media screen and (min-width: 1200px) {
        width: 410px;
    }    
`;

export const Description = styled('div')`
    font-size: 12px;
    line-height: 1.48;
    font-style: italic;
    white-space: pre-line;

    @media screen and (min-width: 480px) {
        font-size: 14px;
    }

    @media screen and (min-width: 768px) {
        font-size: 16px;
    }
`;

export const Poster = styled('img')`
    border-radius: 2px;
`;
