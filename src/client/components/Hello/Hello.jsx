import React, { PureComponent } from 'react';
import {
  Wrapper,
  Title,
  Subtitle,
  Text,
  Item,
  List,
  Link,
} from './Hello.styled';

class Hello extends PureComponent {
  render() {
    const { user } = this.props;
    return (
      <Wrapper>
        <Title>{`Приветствуем на Акигами, ${user.displayName}!`}</Title>
        <Subtitle>Начни свой путь уже сейчас!</Subtitle>
        <List>
          <Item completed>
            <Text>
              <Link href="/overview">Добавь</Link> или{' '}
              <Link href="/settings">импортируй</Link> аниме/мангу в свою
              библиотеку
            </Text>
          </Item>
          <Item>
            <Text>
              Загляни в свою <a href={user.link}>ленту</a>
            </Text>
          </Item>
          <Item>
            <Text>Оставь хотя бы 1 комментарий к посту</Text>
          </Item>
          <Item>
            <Text>Подпишись хотя бы на 3-х пользователей</Text>
          </Item>
          <Item>
            <Text>Поставь лайк понравившемуся посту</Text>
          </Item>
        </List>
      </Wrapper>
    );
  }
}

export default Hello;
