import styled from '@emotion/styled';

export const DividerWrapper = styled('div')`
  box-sizing: border-box;
  padding: 22px 0;
  position: relative;
  text-align: center;
`;

export const DividerLine = styled('div')`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: -1px;
  margin: auto;
  width: 100%;
  height: 1px;
  background: ${p => p.theme.colors.border};
`;

export const DividerTitle = styled('div')`
  box-sizing: border-box;
  font-family: ${p => p.theme.fontFamily};
  color: ${p => p.theme.colors.default};
  background: ${p => p.theme.colors.background};
  position: relative;
  display: inline-block;
  max-width: 90%;
  padding: 0 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
