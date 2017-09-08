import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';
import m from 'moment';
import {
    Inner,
    Tags,
    Tag,
    Item,
    Title,
    Time,
} from './TimelineItem.styled';

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
            <Item
                href={`/anime/${entity.id}`}
                style={{
                    backgroundImage: `url(${entity.cover})`,
                }}
            >
                <Inner>
                    <Title>{entity.title.romaji}</Title>
                    <Tags>
                        {entity.genres.map((item, index) => (
                            <Tag key={item.title}>{item.title}</Tag>
                        ))}
                    </Tags>
                    <Time>{this.getTime()}</Time>
                </Inner>
            </Item>
        );
    }
}
