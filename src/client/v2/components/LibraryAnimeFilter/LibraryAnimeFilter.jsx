import React, { Component } from 'react';
import { Input, Segment, Label, Form, Checkbox } from 'semantic-ui-react';
import TitledBlock from '../TitledBlock';

class LibraryAnimeFilter extends Component {
  render() {
    return (
      <React.Fragment>
        <Input fluid icon="search" placeholder="Поиск..." />
        <TitledBlock basic title="Фильтры">
          <Segment attached="top">
            <Label attached="top">Категория</Label>
            <Form>
              <Form.Field className="sort-field field-planned">
                <Checkbox name="planned" label="Запланировано" />
              </Form.Field>
              <Form.Field className="sort-field field-current">
                <Checkbox name="current" label="Смотрю сейчас" />
              </Form.Field>
              <Form.Field className="sort-field field-completed">
                <Checkbox name="completed" label="Просмотрено" />
              </Form.Field>
              <Form.Field className="sort-field field-paused">
                <Checkbox name="paused" label="Отложено" />
              </Form.Field>
              <Form.Field className="sort-field field-dropped">
                <Checkbox name="dropped" label="Брошено" />
              </Form.Field>
            </Form>
          </Segment>
          <Segment attached="bottom">
            <Label attached="top">Статус</Label>
            <Form>
              <Form.Field>
                <Checkbox name="announced" label="Анонсировано" />
              </Form.Field>
              <Form.Field>
                <Checkbox name="ongoing" label="Сейчас выходит" />
              </Form.Field>
              <Form.Field>
                <Checkbox name="released" label="Завершенные" />
              </Form.Field>
              <Form.Field>
                <Checkbox name="latest" label="Недавно завершены" />
              </Form.Field>
            </Form>
          </Segment>
        </TitledBlock>
      </React.Fragment>
    );
  }
}

export default LibraryAnimeFilter;
