import React, { PureComponent } from 'react';
import { inject } from 'mobx-react';
import { DropdownItem } from './Dropdown.styles';

@inject('closeDropdown')
class DropdownItemLink extends PureComponent {
  render() {
    const { children, closeDropdown, ...props } = this.props;
    return (
      <DropdownItem
        as="a"
        onClick={closeDropdown}
        {...props}
      >
        {children}
      </DropdownItem>
    );
  }
}

export default DropdownItemLink;
