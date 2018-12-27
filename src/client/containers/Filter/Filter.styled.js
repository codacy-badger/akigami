import styled from '@emotion/styled'
import { css } from 'emotion'
import { FormControl } from 'react-bootstrap';

export const Wrapper = styled('div')`
  background-color: #fff;
  border-radius: 2px;
  padding: ${props => (props.fixed ? '16px 0' : '16px')};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  transition: padding 0.2s ease;
  will-change: padding;

  @media screen and (max-width: 650px) {
    padding: ${props => (props.fixed ? '8px 0' : '8px')};
  }
`;

export const Header = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Trigger = styled('button')`
  background: none;
  border: none;
  outline: none;
  color: ${props => (props.active ? '#d54343' : '#4a4a4a')};
  font-size: 24px;
  display: flex;
  flex-shrink: 0;
  width: 36px;

  transition: font-size 0.2s ease, width 0.2s ease;
  will-change: font-size, width;

  @media screen and (max-width: 650px) {
    width: 34px;
    font-size: 22px;
  }
`;

export const Search = styled(FormControl)`
  background-color: transparent;
  border: none;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.2px;
  display: flex;

  transition: font-size 0.2s ease;
  will-change: font-size;

  @media screen and (max-width: 650px) {
    font-size: 14px;
  }
`;

export const Expand = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 22px 6px 8px;

  transition: padding 0.2s ease;
  will-change: padding;

  @media screen and (max-width: 650px) {
    padding: 18px 6px 8px;
  }
`;

const defaultStyle = css`
  position: relative;
`;

const fixedStyle = css`
  position: fixed;
  top: 48px;
  left: 0;
  background-color: #fff;
`;

export const Fixer = styled('div')`
  ${props => (props.fixed ? fixedStyle : defaultStyle)};
  z-index: 10;
  width: 100%;
  transition: 0.2s ease;
  will-change: position, top, left, background-color;
`;
