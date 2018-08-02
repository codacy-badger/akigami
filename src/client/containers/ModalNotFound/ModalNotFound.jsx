import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('app')
@observer
export default class ModalNotFound extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    app: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.timer = setTimeout(this.handleClose, 2000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  handleClose = () => {
    this.props.app.modal.close(this.props.id);
  };
  render() {
    return (
      <div
        style={{
          padding: '60px 60px 60px',
        }}
      >
        Modal not found
      </div>
    );
  }
}
