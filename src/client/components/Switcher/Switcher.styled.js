import styled from '@emotion/styled'
import { Button as Btn } from 'react-bootstrap';

export const Wrapper = styled('div')`
  display: ${props => (props.inline ? 'inline-block' : 'block')};
`;

export const Switch = styled(Btn)``;
