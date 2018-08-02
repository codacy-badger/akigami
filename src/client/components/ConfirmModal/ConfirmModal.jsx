import React, { PureComponent } from 'react';
import { inject } from 'mobx-react';
import { Confirm, Button, Text } from './ConfirmModal.styled';

@inject('app')
class ConfirmModal extends PureComponent {
  render() {
    const { app, id } = this.props;
    return (
      <Confirm>
        <Text>Вы действительно хотите мясо?</Text>
        <Button>Да</Button>
        <Button
          onClick={() => {
            app.modal.close(id);
          }}
        >
          Нет
        </Button>
      </Confirm>
    );
  }
}

export default ConfirmModal;
