import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';
import m from 'moment';

export default class TimelineItem extends PureComponent {
    static propTypes = {
        entity: PropTypes.object.isRequired,
    }
    getTime = () => {
        const { entity: { nextEpisode = 0 } = {} } = this.props;
        if (nextEpisode >= new Date().getTime()) {
            return capitalize(m(nextEpisode).locale('ru').endOf('day').fromNow());
        }
        return 'Уже вышло';
    }
    render() {
        const { entity } = this.props;
        return (
            <a
                href={`/anime/${entity.id}`}
                className="timeline"
                style={{
                    backgroundImage: `url(${entity.cover})`,
                }}
            >
                <div className="timeline-inner">
                    <h1>{entity.title.romaji}</h1>
                    <div className="timeline-tags">
                        {entity.genres.map((item, index) => (
                            <span key={item.title}>{item.title}</span>
                        ))}
                    </div>
                    <p>{this.getTime()}</p>
                </div>
            </a>
        );
    }
}
