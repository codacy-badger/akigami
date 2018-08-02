import styled, { css } from 'react-emotion';

const dropdownContent = css`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  list-style-type: none;
`;

export const Dropdown = styled('div')`
  position: relative;
  display: inline-block;
  &:hover .${dropdownContent} {
    display: block;
  }
`;

export const Trigger = styled('span')`
  cursor: pointer;
`;

export const DropdownContent = styled('div')`
  ${dropdownContent};
`;

export const Item = styled('li')`
  text-decoration: none;
  padding: 12px 16px;
  &:hover {
    cursor: pointer;
    background-color: #f1f1f1;
  }
`;
