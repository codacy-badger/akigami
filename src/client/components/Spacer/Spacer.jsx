import React, { Component } from 'react';
import SpacerStyled from './Spacer.styles';

class Spacer extends Component {
  render() {
    return (
      <SpacerStyled {...this.props} />
    );
  }
}

export default Spacer;
