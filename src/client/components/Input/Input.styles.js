import styled from '@emotion/styled';

export default styled('input')`
  line-height: 43px;
  margin: 0;
  border: 1px solid ${p => p.theme.colors.border};
  padding: 0 12px;
  font-family: ${p => p.theme.fontFamily};
  border-radius: ${p => p.theme.borderRadius};
  box-sizing: border-box;
  display: ${p => (p.block ? 'block' : 'inline-block')};
  width: ${p => (p.block ? '100%' : 'auto')};
  color: ${p => p.theme.colors.default};

  &:-webkit-input-placeholder {
    font-family: ${p => p.theme.fontFamily};
    color: ${p => p.theme.colors.gray};
  }

  &:-moz-placeholder {
    font-family: ${p => p.theme.fontFamily};
    color: ${p => p.theme.colors.gray};
  }
`;
