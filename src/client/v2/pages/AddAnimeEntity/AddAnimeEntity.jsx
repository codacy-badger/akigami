import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Text from 'react-textarea-autosize';
import {
  Container,
  Grid,
  Header,
  Form,
  Button,
  Input,
  Icon,
  Divider,
  Flag,
  Dropdown,
} from 'semantic-ui-react';
import get from 'lodash/get';
import debugNamespace from 'debug';
import { ApolloClient } from '../../lib/modules';
import Inline from '../../components/Inline';
import PosterUploadCard from '../../components/PosterUploadCard';
import CoverUploadCard from '../../components/CoverUploadCard';
import AddAnimeEntityStore from './AddAnimeEntity.store';

const debug = debugNamespace('akigami:client:anime:create');

@inject('app')
@observer
class AddAnimeEntity extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.store = new AddAnimeEntityStore(props.app);
    this.state = {
      availableGenres: [],
    };
  }

  componentDidMount() {
    this.fetchGenres();
  }

  getFieldValue(field) {
    return get(this.store, field) || '';
  }

  handleChangeField = (field) => (event) => {
    let { value } = event.target;
    if (typeof value === 'string' && !value.length) {
      value = undefined;
    }
    this.store.setField(field, value);
  }

  async fetchGenres() {
    const res = await ApolloClient.query({
      query: `
        {
          genres {
            id
            title
          }
        }
      `,
    });
    debug('genres', res);
    this.setState({
      availableGenres: res.data.genres,
    });
  }

  handleSubmit() {
    this.store.submit();
  }

  render() {
    const { availableGenres } = this.state;
    const alternateTitlesLabel = <label>Альтернативные названия</label>;
    return (
      <Container>
        <div className="page-content">
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as="h1">
                  Добавить новое аниме
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field
                    required
                    width={16}
                    size="massive"
                    label="Название на ромадзи"
                    value={this.getFieldValue('title.romaji')}
                    onChange={this.handleChangeField('title.romaji')}
                    control={Input}
                    placeholder="Укажите название аниме"
                  />
                  <Form.Group widths="equal">
                    <Form.Field
                      label={(
                        <label>
                          <Flag name="ru" />
                          Название на русском
                        </label>
                      )}
                      value={this.getFieldValue('title.russian')}
                      onChange={this.handleChangeField('title.russian')}
                      control={Input}
                    />
                    <Form.Field
                      label={(
                        <label>
                          <Flag name="gb" />
                          Название на английском
                        </label>
                      )}
                      value={this.getFieldValue('title.english')}
                      onChange={this.handleChangeField('title.english')}
                      control={Input}
                    />
                    <Form.Field
                      label={(
                        <label>
                          <Flag name="jp" />
                          Название на японском
                        </label>
                      )}
                      value={this.getFieldValue('title.japanese')}
                      onChange={this.handleChangeField('title.japanese')}
                      control={Input}
                    />
                  </Form.Group>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={8}>
                        {this.getFieldValue('title.other').map((item, index) => (
                          <Form.Field key={index}> {/* eslint-disable-line */}
                            {index === 0 && alternateTitlesLabel}
                            <Inline align="center">
                              <Button
                                basic
                                icon="remove"
                                type="button"
                                className="list-remove-button"
                                onClick={() => this.store.title.other.splice(index, 1)}
                              />
                              <input
                                value={this.getFieldValue(`title.other[${index}]`)}
                                onChange={this.handleChangeField(`title.other[${index}]`)}
                                placeholder={`Альтернативное название №${index + 1}`}
                              />
                            </Inline>
                          </Form.Field>
                        ))}
                        <Form.Field>
                          {!this.getFieldValue('title.other').length && alternateTitlesLabel}
                          <Button
                            icon
                            basic
                            labelPosition="left"
                            type="button"
                            onClick={() => this.store.title.other.push('')}
                          >
                            <Icon name="add" />
                            Добавить
                          </Button>
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <Form.Field
                          control={Dropdown}
                          multiple
                          selection
                          fluid
                          label="Жанры"
                          options={availableGenres.map(e => ({ key: e.id, value: e.id, text: e.title }))}
                          placeholder="Укажите жанры"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Divider section hidden />
                  <Form.Group widths="equal">
                    <Form.TextArea
                      label={(
                        <label>
                          <Flag name="ru" />
                          Описание на русском
                        </label>
                      )}
                      placeholder="Введите описание на русском языке"
                      value={this.getFieldValue('description.russian')}
                      onChange={this.handleChangeField('description.russian')}
                      control={Text}
                    />
                    <Form.TextArea
                      label={(
                        <label>
                          <Flag name="gb" />
                          Описание на английском
                        </label>
                      )}
                      placeholder="Введите описание на английском языке"
                      value={this.getFieldValue('description.english')}
                      onChange={this.handleChangeField('description.english')}
                      control={Text}
                    />
                  </Form.Group>
                  <Divider section hidden />
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>Постер</label>
                      <PosterUploadCard
                        src={this.store.poster.original}
                        onChange={file => this.store.uploadImage(file, 'poster')}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Обложка</label>
                      <CoverUploadCard
                        src={this.store.cover.original}
                        onChange={file => this.store.uploadImage(file, 'cover')}
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

export default AddAnimeEntity;
