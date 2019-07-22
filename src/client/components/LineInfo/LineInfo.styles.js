import styled from '@emotion/styled';

export const Wrapper = styled('div')`
  display: flex;
  &:not(:last-child) {
    margin-bottom: 8px;
    border-bottom: 1px solid ${p => p.theme.colors.border};
    padding-bottom: 8px;
  }
`;

export const Title = styled('div')`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Value = styled('div')`
  flex: 1;
  margin-left: 12px;
  text-align: right;
  white-space: nowrap;
`;
