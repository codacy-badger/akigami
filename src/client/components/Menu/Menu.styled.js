import { css } from 'emotion';
import styled from 'react-emotion';

const wrapSticky = css`
  position: sticky;
  transform: translate3d(0, 0, 0);
  width: 100%;
  z-index: 10;
  top: 48px;
`;

const wrapNormal = css`
  position: relative;
`;

export const Wrapper = styled('div')`
  ${p => (p.sticky ? wrapSticky : wrapNormal)};
  height: 40px;

  @media screen and (max-width: 991px) {
    height: 33px;
  }
`;

export const MenuInner = styled('div')`
  background-color: #efeeeb;

  @media screen and (max-width: 767px) {
    .col-xs-12 {
      white-space: nowrap;
      overflow-x: auto;
    }
  }
`;

const normal = css`
  color: inherit;
  background: transparent;
`;

const active = css`
  color: aliceblue;
  background: #d54343;
`;

export const Item = styled('button')`
  ${p => (p.active ? active : normal)};
  border: none;
  padding: 10px 18px;
  transition: color 0.2s ease, background 0.2s ease;
  will-change: color, background;
  border-radius: 0;

  &:hover {
    color: aliceblue;
    background: #d54343;
  }

  @media screen and (max-width: 991px) {
    padding: 8px 14px;
    font-size: 12px;
  }
`;

export const Counter = styled('span')`
  font-size: 12px;
  margin-left: 6px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 2px 6px;
  color: white;
  border-radius: 2px;
`;

export const Title = styled('span')``;
