import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
        const complete = completed && 'Следующая серия уже в эфире!';
        const text = 'Следующая серия через';
        if (day) {
            return `${text} ${day}`;
        } else if (hour) {
            return `${text} ${hour}`;
        } else if (minute) {
            return `${text} ${minute}`;
        }
        return complete;
    }
    render() {
        const { type, entity } = this.props;
        return (
            <div className="timeline">
                <Entity noTitle type={type} item={entity} />
                <div className="timeline-info">
                    <a href={`/${type}/${entity.id}`}>
                        {entity.title.romaji}
                    </a>
                    <div className="timeline-next">
                        <Countdown date={entity.nextEpisode} renderer={this.renderer} />
                    </div>
                </div>
            </div>
        );
    }
}
