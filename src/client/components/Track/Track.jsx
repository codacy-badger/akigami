import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Icon from '../Icon';
import {
  Item,
  Wrapper,
  Overlay,
  Cover,
  Info,
  Line,
  Artist,
  Title,
  Anime,
  Type,
} from './Track.styled';

class Track extends PureComponent {
  static propTypes = {
    track: PropTypes.object.isRequired,
    album: PropTypes.object.isRequired,
    artist: PropTypes.object.isRequired,
    anime: PropTypes.object.isRequired,
    onRequest: PropTypes.func,
  };
  static defaultProps = {
    onRequest: e => console.log('default handler', e),
  };
  render() {
    const { track, album, artist, anime, onRequest } = this.props;
    const tooltip = (
      <Tooltip id={`request-${track._id}`}>Заказать песню</Tooltip>
    );
    return (
      <Item>
        <Wrapper>
          <OverlayTrigger placement="top" overlay={tooltip}>
            <Overlay onClick={() => onRequest(track)}>
              <Icon type="play" />
            </Overlay>
          </OverlayTrigger>
          <Cover src={album.cover.small} alt={track.title} />
        </Wrapper>
        <Info>
          <Line>
            <Artist href={`/people/${artist._id}`}>
              {`${artist.firstName.romaji} ${artist.lastName.romaji}`}
            </Artist>
            <Title>{track.title}</Title>
          </Line>
          <Line>
            <Anime href={`/anime/${anime._id}`}>{anime.title.romaji}</Anime>
            <Type>{track.type}</Type>
          </Line>
        </Info>
      </Item>
    );
  }
}

export default Track;
