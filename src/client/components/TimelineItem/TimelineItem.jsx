import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';
import Countdown from 'react-countdown-now';

import Entity from '../Entity';

export default class TimelineItem extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        entity: PropTypes.object.isRequired,
    }
    renderer({ days, hours, minutes, completed }) {
        const day = days !== 0 && `${days} дней`;
        const hour = hours !== 0 && `${hours} часов`;
        const minute = minutes !== 0 && `${minutes} минут`;
        const complete = completed && <strong>Уже в эфире!</strong>;
        if (day) {
            return <span>Через <strong>{day}</strong></span>;
        } else if (hour) {
            return <span>Через <strong>{hour}</strong></span>;
        } else if (minute) {
            return <span>Через <strong>{minute}</strong></span>;
        }
        return <span>{complete}</span>;
    }
    render() {
        const { type, entity } = this.props;
        if (typeof window === 'undefined') return false;
        return (
            <div className="timeline">
                <Entity noTitle type={type} item={entity} />
                <div className="timeline-info">
                    <a href={`/${type}/${entity.id}`}>
                        {truncate(entity.title.romaji, { length: 50, separator: /,? +/ })}
                    </a>
                    <div className="timeline-genres">
                        {entity.genres.map(genre => <span>{genre.title}</span>)}
                    </div>
                    <div className="timeline-next">
                        <Countdown
                            date={entity.nextEpisode}
                            renderer={this.renderer}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
