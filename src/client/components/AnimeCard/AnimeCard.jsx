import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AspectRatio from '../AspectRatio';
import { Inner, Title, Wrapper } from './AnimeCard.styles';
import Block from '../Block';

class AnimeCard extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <Wrapper href={`/anime/${item.id}`}>
        <Block padded={false} mb={false} overflow="hidden">
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
        </Block>
      </Wrapper>
    );
  }
}

export default AnimeCard;
