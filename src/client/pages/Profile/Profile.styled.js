import styled from '@emotion/styled'
import Grid from 'react-bootstrap/lib/Grid';
import Button from 'react-bootstrap/lib/Button';
import R from 'react-bootstrap/lib/Row';
import C from 'react-bootstrap/lib/Col';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';

addStyle(Button, 'transparent');

export const Header = styled('div')`
  height: 400px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(45, 45, 45, 0.6);
  }
`;

export const Inner = styled(Grid)`
  height: 100%;
  position: relative;
  z-index: 1101;
`;

export const Row = styled(R)`
  height: 100%;
`;

export const Col = styled(C)`
  display: flex;
  height: 100%;
`;

export const Bottom = styled('div')`
  width: 100%;
  display: flex;
  align-self: flex-end;
  align-items: flex-end;
  flex-direction: row;
  margin-bottom: 32px;
  transition: flex-direction 0.2s ease, align-items 0.2s ease;
  will-change: flex-direction, align-items;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Avatar = styled('img')`
  width: 120px;
  height: 120px;
  box-shadow: 0 0 0 2px white;
  padding: 3px;
  border-radius: 100px;
  transition: width 0.2s ease, height 0.2s ease;
  will-change: width, height;

  @media screen and (max-width: 991px) {
    width: 100px;
    height: 100px;
  }
`;

export const Info = styled('div')`
  margin-left: 32px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: margin-left 0.2s ease;
  will-change: margin-left;

  @media screen and (max-width: 767px) {
    margin-left: 0;
  }
`;

export const User = styled('h2')`
  font-weight: 600;
  margin-bottom: 0;
`;

export const Status = styled('p')`
  margin-top: 6px;
  margin-bottom: 0;
`;

export const Settings = styled(Button)`
  margin-top: 8px;
  margin-right: auto;
`;

export const About = styled('div')`
  white-space: pre-line;
`;

export const CoverActions = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px 10px;
  display: flex;

  > *:not(:last-child) {
    margin-right: 6px;
  }
`;

export const CoverAction = styled(Button)`
  padding: 5px 10px 3px;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  outline: none;
  color: #fff;
  font-size: 22px;
`;
