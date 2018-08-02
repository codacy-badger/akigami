import styled from 'react-emotion';
import { Button as Btn } from 'react-bootstrap';

export const Confirm = styled('div')`
  padding: 32px 60px;
  text-align: center;
`;

export const Text = styled('div')`
  color: #fff;
  font-size: 22px;
  margin-bottom: 18px;
`;

export const Button = styled(Btn)`
  background: transparent;
  color: #fff;
  min-width: 90px;
  padding: 8px 24px;

  &:not(:last-child) {
    margin-right: 24px;
  }
`;
