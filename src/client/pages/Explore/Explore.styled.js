import styled from 'react-emotion';
import Button from 'react-bootstrap/lib/Button';

export const Content = styled('div')`
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

export const Header = styled('div')`
  display: flex;
  align-items: baseline;
`;

export const Switch = styled(Button)`
  margin-right: 16px;
  padding: 0 6px;
  font-size: 24px;
  color: #424242;

  &:hover {
    color: #d54343;
  }

  @media screen and (max-width: 650px) {
    margin-right: 6px;
    font-size: 18px;
  }
`;

export const Title = styled('h1')`
  margin: 0;
  font-weight: bold;
  margin: 32px 0;

  &:after {
    content: '';
    width: 40px;
    margin-top: 4px;
    height: 4px;
    background-color: #9b9b9b;
    display: block;
    border-radius: 4px;
  }

  > div {
    margin-left: 24px;
  }

  @media screen and (max-width: 650px) {
    font-size: 20px;
  }
`;

export const Grid = styled('div')`
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
  justify-content: space-between;

  > div {
    margin: 8px;
  }

  @media screen and (max-width: 472px) {
    justify-content: space-around;
  }
`;

export const Fixer = styled('div')`
  width: 140px;
`;

export const Settings = styled('div')`
  margin: 8px -10px 42px;
  min-height: 70px;

  transition: 0.2s ease;

  @media screen and (max-width: 650px) {
    margin: 0 -10px 32px;
    min-height: 52px;
  }
`;
