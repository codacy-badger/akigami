import styled from 'react-emotion';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';

export const Card = styled('div')`
  text-align: center;
  margin-top: 12rem;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 3px;
  border: 1px solid #eee;
  box-shadow: 0 2px 12px rgba(155, 155, 155, 0.2);
  background-color: white;
`;

export const Title = styled('h1')`
  margin: 0;
`;

export const Help = styled('small')`
  margin-bottom: 48px;
  display: block;
`;

export const Input = styled(FormControl)`
  text-align: center;
`;

export const Group = styled(FormGroup)`
  width: 100%;
`;

export const Submit = styled(Button)`
  margin-top: 32px;
`;

export const Recover = styled('a')`
  font-size: 12px;
  margin-top: 18px;
  color: #666;
  border-bottom: 1px solid #bbb;
`;
