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
  }

  constructor(props) {
    super(props);
    this.store = new AddStudioStore(props.app);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getFieldValue(field) {
    return get(this.store, field) || '';
  }

  handleChangeField = (field, plain) => (event) => {
    let value = event;
    if (!plain) {
      ({ value } = event.target);
    }
    if (typeof value === 'string' && !value.length) {
      value = undefined;
    }
    this.store.setField(field, value);
  }

  handleSubmit() {
    this.store.submit();
  }

  render() {
    return (
      <Container>
        <div className="page-content">
          <Grid>
            <PageHeader title="Добавить новую студию" />
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
                      <label>Изображение</label>
                      <ImageUploadCard
                        src={this.store.image.original}
                        onChange={file => this.store.uploadImage(file)}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Button type="submit">Создать</Button>
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
