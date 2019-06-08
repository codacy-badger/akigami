import React, { Component } from 'react';
import Paper from '../Paper';
import AspectRatio from '../AspectRatio';
import { Wrapper, Inner } from './AnimeCard.styles';

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
            {item.title.russian}
          </Inner>
        </Paper>
      </Wrapper>
    );
  }
}

export default AnimeCard;
