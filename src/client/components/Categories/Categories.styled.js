import { css } from 'emotion';
import styled from '@emotion/styled'
import { Button } from 'react-bootstrap';
import I from '../Icon';

export const List = styled('div')`
  display: flex;
  flex-direction: column;
`;

const active = css`
  border-color: #d54343 !important;
  box-shadow: none !important;
`;

const none = css`
  border-color: transparent;
`;

export const Item = styled(Button)`
  ${p => (p.active ? active : none)};
  display: flex;
  align-items: center;
  color: #666;
  border: 1px solid;
  background-color: white;


  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &:hover {
    border-color: #ddd;
    color: inherit;
  }

  &:focus,
  &:active {
    box-shadow: none;
  }
`;

export const Icon = styled(I)`
  font-size: 20px;
`;

export const Title = styled('span')`
  margin-left: 12px;
  line-height: 28px;
`;
