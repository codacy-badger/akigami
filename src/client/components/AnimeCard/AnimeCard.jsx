import React, { Component } from 'react';
import AspectRatio from '../AspectRatio';
import { Paper, Wrapper, Inner, Title } from './AnimeCard.styles';

class AnimeCard extends Component {
  render() {
    const { item } = this.props;
    return (
      <Wrapper href={`/anime/${item.id}`}>
        <Paper overflow="hidden">
          <AspectRatio ratio="4:6">
            <img
              src={item.poster}
              alt={item.title.russian}
              width="100%"
              height="100%"
              fit="cover"
            />
          </AspectRatio>
          <Inner>
            <Title>
              {item.title.russian}
            </Title>
          </Inner>
        </Paper>
      </Wrapper>
    );
  }
}

export default AnimeCard;
