import React, { PureComponent } from 'react';
import { Dropdown as SDropdown } from 'semantic-ui-react';

class Dropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleOpen() {
    if (!this.state.open) {
      this.setState({ open: true });
    }
  }
  handleClick(e, data) {
    console.log(e, data);
  }
  render() {
    const { children, ...props } = this.props;
    return (
      <SDropdown
        onOpen={this.handleOpen}
        onChange={this.handleClick}
        {...props}
      >
        {children}
      </SDropdown>
    );
  }
}

export default Dropdown;
