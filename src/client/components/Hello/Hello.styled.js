import { css } from 'emotion';
import styled from 'emotion/react';
import { Jumbotron } from 'react-bootstrap';

export const Wrapper = styled(Jumbotron)`
    position: relative;
`;

export const Title = styled('h4')`
    margin-top: 0;
    margin-bottom: 4px;
`;

export const Subtitle = styled('small')`
    position: relative;
`;

export const List = styled('ol')`
    margin-top: 16px;
    padding-left: 0;
    margin-bottom: 0;
    list-style-type: none;
    counter-reset: hello-counter;
`;

export const Text = styled('span')`
    text-decoration: none;
`;

const defaultItem = css`
    opacity: 1.;
    &:before {
        color: #d54343;
        background-color: white;
    }
`;

const completedItem = css`
    opacity: .4;
    &:before {
        color: white;
        background-color: #d54343;
    }
`;

export const Item = styled('li')`
    composes: ${p => (p.completed ? completedItem : defaultItem)};
    font-weight: bold;
    font-size: 12px;

    &:not(:last-child) {
        margin-bottom: 8px;
    }

    &:before {
        content: counter(hello-counter);
        counter-increment: hello-counter;
        font-size: 14px;
        font-weight: bold;
        border: 1px solid #d54343;
        margin-right: 10px;
        line-height: 24px;
        display: inline-block;
        width: 25px;
        height: 25px;
        text-align: center;
    }

    ${Text} {
        text-decoration: ${p => (p.completed ? 'line-through' : 'none')};
    }
`;

export const Link = styled('a')`
    border-bottom: 1px solid;
`;
