import styled from 'react-emotion';
import FormControl from 'react-bootstrap/lib/FormControl';

export const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Group = styled('div')`
  display: flex;
  align-items: center;
  padding: 0 0 0 12px;
  border-radius: 3px;
  flex: 1;
  color: #424242;
  background-color: white;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.15);
  &:first-child {
    margin-right: 6px;
  }
`;

export const Label = styled('span')`
  font-size: 14px;
  padding-right: 3px;
`;

export const Input = styled(FormControl)`
  background: transparent;
  color: #424242;
  border: none;
  padding: 6px 12px;
  border-radius: 0;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
