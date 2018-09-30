import React, { PureComponent } from 'react';
import { Dropdown as SDropdown } from 'semantic-ui-react';

class Dropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }
  handleMouseEnter() {
    if (!this.dropdown.state.open) {
      this.dropdown.open();
    }
  }
  handleMouseLeave() {
    if (this.dropdown.state.open) {
      this.dropdown.close();
    }
  }
  handleTouchEnd(e) {
    if (!this.dropdown.state.open) {
      e.preventDefault();
      this.handleMouseEnter();
    }
  }
  render() {
    const { children, ...props } = this.props;
    return (
      <SDropdown
        ref={(c) => { this.dropdown = c; }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchEnd={this.handleTouchEnd}
        {...props}
      >
        {children}
      </SDropdown>
    );
  }
}

export default Dropdown;
