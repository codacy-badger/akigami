import styled from '@emotion/styled';

export const ItemWrapper = styled('div')`
  margin-bottom: 22px;
`;

export const ItemTitle = styled('p')`
  font-size: 16px;
  padding-bottom: 12px;
`;

export const ItemContent = styled('div')`
  box-sizing: border-box;
`;

export const ItemRequired = styled('span')`
  font-weight: 300;
  font-size: 14px;
  padding-left: 8px;
  color: ${p => p.theme.colors.gray};
`;
