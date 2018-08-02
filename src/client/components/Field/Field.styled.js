import styled from 'react-emotion';

export const Block = styled('div')`
  display: flex;
  align-items: center;

  &:first-child {
    margin-top: 24px;
  }

  &:not(:last-child) {
    margin-bottom: 32px;
    border-bottom: 1px solid #e3e3e3;
    padding-bottom: 32px;
  }
`;

export const Column = styled('div')`
  display: flex;
  flex-direction: column;
  min-width: 240px;
  max-width: 60%;
  ${props => (props.actions ? 'margin-right: 12px;' : '')};
`;

export const Title = styled('h4')`
  font-weight: 600;
  margin: 0 0 8px;
`;

export const Description = styled('p')`
  font-style: italic;
  color: #777;
`;

export const Actions = styled('div')`
  margin-left: auto;
  flex-shrink: 0;
`;

export const Child = styled('div')`
  max-width: 280px;
`;
