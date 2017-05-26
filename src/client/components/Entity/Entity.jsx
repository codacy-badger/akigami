import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';

import Poster from '../Poster';

class Entity extends PureComponent {
    static defaultProps = {
        poster: null,
        startedAt: null,
        genres: [],
    }
    static propTypes = {
        studio: PropTypes.string.isRequired,
        poster: PropTypes.string,
        startedAt: PropTypes.number,
        genres: PropTypes.array,
        id: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        entityType: PropTypes.oneOf(['anime', 'manga', 'ranobe']).isRequired,
    }
    render() {
        const { studio, poster, startedAt, genres, title, id, type, entityType } = this.props;
        return (
            <article className="entity">
                <Poster src={poster} title={title} id={id} type={entityType} />
                <div className="entity-title">
                    <a href={`/${type}/${id}`}>{truncate(title, { length: 35 })}</a>
                </div>
                <div className="entity-types">
                    <a href="#type" className="entity-type">{type}</a>
                </div>
                <div className="entity-meta">
                    <div className="entity-genres">
                        {genres.map(genre => (
                            <div key={genre.id} className="entity-genre">
                                <a href="#genre">{genre.name}</a><span>/</span>
                            </div>
                        ))}
                    </div>
                    <div className="entity-studio-wrapper">
                        <span className="entity-studio">{studio}</span>
                        {startedAt && (
                            <span className="entity-year">
                                {new Date(startedAt).getFullYear()}
                            </span>
                        )}
                    </div>
                </div>
            </article>
        );
    }
}

export default Entity;
