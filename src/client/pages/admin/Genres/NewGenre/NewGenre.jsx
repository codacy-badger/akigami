import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Modal, Button, Icon, Form } from 'semantic-ui-react';

@inject('store')
@observer
class NewGenre extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    data: PropTypes.object,
  }

  static defaultProps = {
    data: null,
  }

  constructor(props) {
    super(props);
    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loadData = this.loadData.bind(this);
    this.modal = React.createRef();
  }

  loadData() {
    const { store, data } = this.props;
    if (data) {
      store.editNewField('id', data.id);
      store.editNewField('title', data.title);
    }
  }

  handleChangeField(e) {
    const { store } = this.props;
    store.editNewField('title', e.target.value);
  }

  handleCreate() {
    const { store, data } = this.props;
    store.create(!!data, () => {
      this.modal.current.handleClose();
    });
  }

  handleClose() {
    const { store } = this.props;
    store.clearNew();
  }

  render() {
    const { store, children, data } = this.props;
    const prefix = data ? 'Изменить' : 'Создать';
    return (
      <Modal
        ref={this.modal}
        trigger={children}
        size="mini"
        onOpen={this.loadData}
        onClose={this.handleClose}
      >
        <Modal.Header>{`${prefix} жанр`}</Modal.Header>
        <Modal.Content>
          <Form.Input
            fluid
            autoFocus
            label="Название"
            placeholder="Введите название жанра"
            value={store.new.title}
            disabled={store.processing}
            onChange={this.handleChangeField}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            loading={store.processing}
            disabled={!store.canCreate}
            onClick={this.handleCreate}
          >
            <Icon name="checkmark" />
            {prefix}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default NewGenre;
