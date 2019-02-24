/* eslint jsx-a11y/label-has-associated-control: 0 */
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
import Inline from '../../components/Inline';
import PosterUploadCard from '../../components/PosterUploadCard';
import CoverUploadCard from '../../components/CoverUploadCard';
import PageHeader from '../../components/PageHeader';

const debug = debugNamespace('akigami:client:anime:create');

// const queryGenres = `
//   {
//     genres {
//       id
//       title
//     }
//   }
// `;

// const queryStudios = `
//   {
//     studios {
//       id
//       title
//     }
//   }
// `;

@inject('app')
@observer
class AddAnimeEntity extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['edit', 'create']).isRequired,
    anime: PropTypes.object,
  }

  static defaultProps = {
    anime: null,
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  getFieldValue(field) {
    return get(this.props.store, field) || '';
  }

  handleChangeField = (field) => (event) => {
    let value = event;
    if (event.target) {
      ({ value } = event.target);
    }
    if (typeof value === 'string' && !value.length) {
      value = undefined;
    }
    this.props.store.setField(field, value);
  }

  handleSubmit() {
    const { type, store } = this.props;
    store.submit(type);
  }

  render() {
    const { type, anime, store } = this.props;
    const { genresList: genres, studiosList: studios } = store;
    const alternateTitlesLabel = <label>Альтернативные названия</label>;
    let title = 'Добавить новое аниме';
    if (type === 'edit') title = `Редактирование ${anime.title.romaji}`;
    return (
      <Container>
        <div className="page-content">
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <PageHeader title={title} />
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
                                onClick={() => store.title.other.splice(index, 1)}
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
                            onClick={() => store.title.other.push('')}
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
                          value={store.genres}
                          options={genres.map(e => ({ key: e.id, value: e.id, text: e.title }))}
                          onChange={(e, { value }) => {
                            this.handleChangeField('genres')(value);
                          }}
                          placeholder="Укажите жанры"
                        />
                        <Form.Field
                          control={Dropdown}
                          selection
                          fluid
                          label="Студия"
                          value={store.studioId}
                          options={studios.map(e => ({ key: e.id, value: e.id, text: e.title }))}
                          onChange={(e, { value }) => {
                            this.handleChangeField('studioId')(value);
                          }}
                          placeholder="Выберите студию"
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
                        src={store.poster}
                        onChange={file => store.uploadImage(file, 'poster')}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Обложка</label>
                      <CoverUploadCard
                        src={store.cover}
                        onChange={file => store.uploadImage(file, 'cover')}
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
