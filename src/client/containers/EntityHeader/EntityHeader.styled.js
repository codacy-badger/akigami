import styled from '@emotion/styled'
import { Grid as G, Row as R, Col as C } from 'react-bootstrap';

export const Block = styled('div')`
  position: relative;
  width: 100%;
  height: ${props => (props.image ? 600 : 400)}px;

  background-color: #efeeeb;
  background-size: cover;
  background-position: center;
  ${props => (props.image ? `background-image: url(${props.image});` : '')};

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props =>
    (props.image ? 'rgba(45,45,45,.6)' : 'transparent')};
  }
`;

export const Grid = styled(G)`
  height: 100%;
`;

export const Row = styled(R)`
  height: 100%;
`;

export const Col = styled(C)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${props => (!props.isCover ? '12px' : '62px 10px')};
`;

export const Footer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  margin-top: ${props => (!props.isCover ? 'inherit' : 'auto')};
`;

function getFontSize(size) {
  switch (size) {
  case 'medium':
    return 42;
  case 'semi':
    return 36;
  case 'small':
    return 32;
  default:
    return 52;
  }
}

function queriesSize(size, type) {
  switch (getFontSize(size)) {
  case 42: {
    if (type === 'tablet') {
      return 'calc(42px - 60%)';
    }
    return 'calc(42px - 80%)';
  }
  case 36: {
    if (type === 'tablet') {
      return 'calc(36px - 60%)';
    }
    return 'calc(36px - 80%)';
  }
  case 32: {
    if (type === 'tablet') {
      return 'calc(32px - 50%)';
    }
    return 'calc(42px - 140%); max-height: 106px;';
  }
  default: {
    if (type === 'tablet') {
      return 'calc(52px - 65%)';
    }
    return 'calc(52px - 120%)';
  }
  }
}

export const Title = styled('h1')`
  margin: 0;
  font-size: ${props => queriesSize(props.size, 'mobile')};
  font-weight: 700;
  color: ${props => (!props.isCover ? '#424242' : '#fff')};
  letter-spacing: -0.3px;
  text-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  display: block;
  text-align: center;
  line-height: 1.2;
  overflow: hidden;

  @media screen and (min-width: 992px) {
    font-size: ${props => queriesSize(props.size, 'tablet')};
  }

  @media screen and (min-width: 1200px) {
    font-size: ${props => getFontSize(props.size)}px;
  }
`;

export const Meta = styled('section')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-top: 1px solid
    ${props => (!props.isCover ? 'rgba(0,0,0,.3)' : 'rgba(255,255,255,.3)')};
  padding: 8px 4px;
  margin-top: 8px;
`;

export const MetaItem = styled('a')`
  color: ${props => (!props.isCover ? '#424242' : '#fff')};
  opacity: 0.7;
  letter-spacing: -0.2px;
  text-transform: uppercase;
  font-weight: 600;

  transition: opacity 0.2s ease;
  will-change: opacity;

  &:not(:last-child) {
    margin: 0 12px 8px 0;
  }

  &:hover {
    opacity: 1;
    color: ${props => (!props.isCover ? '#424242' : '#fff')};
  }

  @media screen and (max-width: 991px) {
    font-size: 12px;
  }
`;

export const Stats = styled('article')`
  display: flex;
  align-items: center;
  margin-top: 24px;
  border: 1px solid ${props => (!props.isCover ? '#424242' : '#fff')};
  border-radius: 2px;
`;

export const Rating = styled('div')`
  display: flex;
  align-items: center;

  background: ${props => (!props.isCover ? '#424242' : '#fff')};
  color: ${props => (!props.isCover ? '#fff' : '#d54343')};
  padding: 8px 22px 8px 12px;

  > i {
    line-height: 1;
    font-size: 32px;
    margin-right: 8px;
    margin-top: 2px;
  }
`;

export const Column = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const Members = styled('div')`
  font-size: 12px;
  line-height: 1;
`;

export const Score = styled('div')`
  font-size: 28px;
  font-weight: 800;
  line-height: 1;
`;

export const List = styled('button')`
  background: transparent;
  border: none;
  outline: none;
  color: ${props => (!props.isCover ? '#d54343' : '#fff')};
  padding: 15px 16px 14px;
  transition: background 0.2s ease;
  will-change: background;
  > i {
    line-height: 1;
    font-size: 24px;
  }
  &:hover {
    color: #fff;
    background: #d54343;
  }
`;
