import React, { Component } from 'react';
import RCDropdown from 'rc-dropdown';
import { Provider } from 'mobx-react';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  handleClose = () => {
    this.setState({ active: false });
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

  handleVisibleChange = (value) => {
    this.setState({
      active: value,
    });
  }

  render() {
    const { active } = this.state;
    const { children, ...props } = this.props;
    return (
      <Provider closeDropdown={this.handleClose}>
        <RCDropdown
          onVisibleChange={this.handleVisibleChange}
          onOverlayClick={this.handleClose}
          visible={active}
          ref={(c) => { this.dropdown = c; }}
          // onMouseEnter={this.handleMouseEnter}
          // onMouseLeave={this.handleMouseLeave}
          // onTouchEnd={this.handleTouchEnd}
          {...props}
        >
          {children({ isActive: active })}
        </RCDropdown>
      </Provider>
    );
  }
}

export default Dropdown;
