import styled from '@emotion/styled';

export const Wrapper = styled('div')`
  display: flex;
  margin-bottom: 12px;
  padding: 0 12px;
`;

export const Title = styled('h4')`
  font-family: ${p => p.theme.fontFamily};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 500;
`;

export const Actions = styled('div')`
  display: flex;
  margin-left: 12px;
  flex-shrink: 0;
`;
