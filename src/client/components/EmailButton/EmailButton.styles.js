import styled from '@emotion/styled';

export const Wrapper = styled('a')`
  display: inline-flex;
  color: ${p => p.theme.colors.default};
  font-family: ${p => p.theme.fontFamily};
  background: ${p => p.theme.colors.white};
  text-decoration: none;
  outline: none;
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.borderRadius};
  padding: 13px 26px 12px 22px;
  font-weight: 500;
  font-size: 18px;
  ${p => p.theme.mixins.transition('background')}

  &:hover {
    background: ${p => p.theme.mixins.darken(p.theme.colors.white, '5%')};
    outline: none;
  }

  &:active {
    background: ${p => p.theme.mixins.darken(p.theme.colors.white, '10%')};
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

export const IconWrapper = styled('div')`
  flex-shrink: 0;
  margin-right: 12px;
`;

export const Text = styled('div')`
  font-size: 16px;
  padding-top: 1px;
`;
