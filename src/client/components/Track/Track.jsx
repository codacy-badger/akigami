import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import Icon from '../Icon';

class Track extends PureComponent {
    static defaultProps = {
        onRequest: e => console.log('default handler', e),
    }
    static propTypes = {
        track: PropTypes.object.isRequired,
        album: PropTypes.object.isRequired,
        artist: PropTypes.object.isRequired,
        anime: PropTypes.object.isRequired,
        onRequest: PropTypes.func,
    }
    render() {
        const { track, album, artist, anime, onRequest } = this.props;
        const tooltip = (
            <Tooltip id={`request-${track._id}`}>Заказать песню</Tooltip>
        );
        return (
            <article className="track">
                <div className="track-cover-wrapper">
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        <button onClick={() => onRequest(track)} className="track-cover-overlay">
                            <Icon type="play" />
                        </button>
                    </OverlayTrigger>
                    <img className="track-cover" src={album.cover.small} alt={track.title} />
                </div>
                <div className="track-info">
                    <div className="track-info-header">
                        <a href={`/people/${artist._id}`} className="track-artist">
                            {`${artist.firstName.romaji} ${artist.lastName.romaji}`}
                        </a>
                        <span className="track-title">{track.title}</span>
                    </div>
                    <div className="track-info-footer">
                        <a href={`/anime/${anime._id}`} className="track-anime">
                            {anime.title.romaji}
                        </a>
                        <span className="track-type">{track.type}</span>
                    </div>
                </div>
            </article>
        );
    }
}

export default Track;
