import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Wrapper from './ContentWrapper.styles';

@inject('ui')
@observer
class ContentWrapper extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
  }

  render() {
    const { ui, ...props } = this.props;
    return (
      <Wrapper isTransparented={ui.transparented} {...props} />
    );
  }
}

export default ContentWrapper;
