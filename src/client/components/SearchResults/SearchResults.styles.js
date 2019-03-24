import styled from '@emotion/styled';
import { Scrollbars } from 'react-custom-scrollbars';

export const ResultsWrapper = styled('div')`
  position: fixed;
  top: ${p => (p.top || 0)}px;
  left: ${p => (p.left || 0)}px;
  width: ${p => (p.width || 0)}px;

  background: ${p => p.theme.colors.white};
  border-radius: ${p => p.theme.borderRadius};
  box-shadow: 0 3px 16px -4px rgba(0, 0, 0, 0.25);
  min-height: 100px;
  margin-top: 8px;
  box-sizing: border-box;
`;

export const ResultsHeader = styled('div')`
  display: flex;
  align-items: center;
  font-weight: 500;
  padding: 8px 18px;
  border-bottom: 1px solid ${p => p.theme.colors.border};
`;

export const ResultsContent = styled(Scrollbars)`
  position: relative;
`;
