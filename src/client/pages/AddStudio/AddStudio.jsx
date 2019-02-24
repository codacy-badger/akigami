/* eslint jsx-a11y/label-has-associated-control: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import { DatePicker } from 'rc-datepicker';
import { Container, Grid, Form, Input, TextArea, Button } from 'semantic-ui-react';

import ImageUploadCard from '../../components/ImageUploadCard';
import PageHeader from '../../components/PageHeader';
import AddStudioStore from './AddStudio.store';

@inject('app')
@observer
class AddStudio extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['edit', 'create']).isRequired,
    studio: PropTypes.object,
  }

  static defaultProps = {
    studio: null,
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // const { studio, type, store } = this.props;
    // if (studio && type === 'edit') {
    //   this.store.setData(studio);
    // }
  }

  componentWillUnmount() {
    this.props.store.revokeImage();
  }

  getFieldValue(field) {
    return get(this.props.store, field) || '';
  }

  handleChangeField = (field, plain) => (event) => {
    let value = event;
    if (!plain) {
      ({ value } = event.target);
    }
    if (typeof value === 'string' && !value.length) {
      value = undefined;
    }
    this.props.store.setField(field, value);
  }

  handleSubmit() {
    const { type } = this.props;
    this.props.store.submit(type);
  }

  render() {
    const { type, store } = this.props;
    let title = 'Добавить новую студию';
    if (type === 'edit') title = `Редактирование ${store.title}`;
    return (
      <Container>
        <div className="page-content">
          <Grid>
            <PageHeader title={title} />
            <Grid.Row>
              <Grid.Column width={16}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field
                    required
                    width={16}
                    size="massive"
                    label="Название студии"
                    value={this.getFieldValue('title')}
                    onChange={this.handleChangeField('title')}
                    placeholder="Укажите название студии"
                    control={Input}
                  />
                  <Form.Field
                    width={16}
                    autoHeight
                    label="Описание"
                    value={this.getFieldValue('about')}
                    onChange={this.handleChangeField('about')}
                    control={TextArea}
                  />
                  <Form.Group>
                    <Form.Field width={6}>
                      <label>Дата основания студии</label>
                      <DatePicker
                        onChange={this.handleChangeField('createdAt', true)}
                        value={this.getFieldValue('createdAt')}
                      />
                    </Form.Field>
                    <Form.Field width={10}>
                      <label>Изображение {store.blob || store.image ? <button onClick={store.clearImage}>X</button> : ''}</label>
                      <ImageUploadCard
                        src={store.blob || store.image}
                        onChange={store.uploadImage}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Button type="submit">
                    {type === 'edit' && 'Изменить'}
                    {type === 'create' && 'Создать'}
                  </Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default AddStudio;
