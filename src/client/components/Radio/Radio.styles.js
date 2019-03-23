import styled from '@emotion/styled';

export const RadioWrapper = styled('div')`
  display: ${p => (p.block ? 'block' : 'inline-block')};
`;

export const RadioLabel = styled('label')`
  font-family: ${p => p.theme.fontFamily};
  color: ${p => p.theme.colors.default};
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
`;

export const RadioInput = styled('input')`
  &:checked,
  &:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  &:checked + ${RadioLabel}:before,
  &:not(:checked) + ${RadioLabel}:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid ${p => p.theme.colors.border};
    border-radius: 100%;
    background: ${p => p.theme.colors.white};
  }
  &:checked + ${RadioLabel}:after,
  &:not(:checked) + ${RadioLabel}:after {
    content: '';
    width: 8px;
    height: 8px;
    background: ${p => p.theme.colors.primary};
    position: absolute;
    top: 6px;
    left: 6px;
    border-radius: 100%;
    transition: all 0.2s ease;
  }
  &:not(:checked) + ${RadioLabel}:after {
    opacity: 0;
    transform: scale(0);
  }
  &:checked + ${RadioLabel}:after {
    opacity: 1;
    transform: scale(1);
  }
`;
