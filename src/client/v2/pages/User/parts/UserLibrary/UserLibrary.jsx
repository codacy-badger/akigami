import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Checkbox, Form, Segment, Label, Input } from 'semantic-ui-react';
import TitledBlock from '../../../../components/TitledBlock';

class UserLibrary extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
  }
  static defaultProps = {
    type: null,
  }
  render() {
    const { type } = this.props;
    let typeTitle = 'Список';
    if (type === 'anime') typeTitle += ' аниме';
    if (type === 'manga') typeTitle += ' манги';
    return (
      <Grid.Row>
        <Grid.Column width={4}>
          <Input fluid icon="search" placeholder="Поиск..." />
          <TitledBlock basic title="Фильтры">
            <Segment attached="top">
              <Label attached="top">Категория</Label>
              <Form>
                <Form.Field>
                  <Checkbox name="planned" label="Запланировано" />
                </Form.Field>
                <Form.Field>
                  <Checkbox name="current" label="Смотрю сейчас" />
                </Form.Field>
                <Form.Field>
                  <Checkbox name="watched" label="Просмотрено" />
                </Form.Field>
                <Form.Field>
                  <Checkbox name="paused" label="Отложено" />
                </Form.Field>
                <Form.Field>
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
        </Grid.Column>
        <Grid.Column width={12}>
          <Header as="h2">{typeTitle}</Header>
          лист
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default UserLibrary;
