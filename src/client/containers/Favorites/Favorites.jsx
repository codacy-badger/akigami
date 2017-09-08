import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uniq from 'lodash/uniq';
import cx from 'classnames';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import Blank from '../../components/Blank';
import {
    Wrapper,
    Items,
    Favorite,
    Title,
    Category,
    Image,
} from './Favorites.styled';

class Favorites extends PureComponent {
    static defaultProps = {
        entities: [],
    }
    static propTypes = {
        entities: PropTypes.array,
    }
    humanizeType = (type) => {
        if (type === 'people') return 'Люди';
        if (type === 'character') return 'Персонажи';
        if (type === 'anime') return 'Аниме';
        if (type === 'manga') return 'Манга';
        if (type === 'track') return 'Музыка';
        if (type === 'novel') return 'Ранобэ';
        return false;
    }
    filterItems(type) {
        return this.props.entities
            .filter(e => e.type === type);
    }
    renderImage = (type, item) => {
        if (['people', 'character'].includes(type)) return item.entity.photo.small;
        if (['anime', 'manga', 'novel'].includes(type)) return item.entity.poster.small;
        if (type === 'track') return item.entity.album.cover.small;
        return false;
    }
    renderTitle = (type, item) => {
        if (['people', 'character'].includes(type)) return `${item.entity.firstName.romaji} ${item.entity.lastName.romaji}`;
        if (['anime', 'manga', 'novel'].includes(type)) return item.entity.title.romaji;
        if (type === 'track') return item.entity.track.title;
        return false;
    }
    render() {
        const { entities } = this.props;
        if (!entities || entities.length === 0) {
            return (
                <Blank>
                    В избранном, к сожалению, ничего нет.
                </Blank>
            );
        }
        const types = uniq(entities.map(e => e.type));
        return (
            <Wrapper>
                {types.map(type => (
                    <Category key={type}>
                        <Title>{this.humanizeType(type)}</Title>
                        <Items>
                            {this.filterItems(type).map(item => (
                                <OverlayTrigger
                                    key={`${type}-${item._id}`}
                                    placement="top"
                                    overlay={(
                                        <Tooltip id={`${type}-${item._id}`}>
                                            {this.renderTitle(type, item)}
                                        </Tooltip>
                                    )}
                                >
                                    <Favorite href={`/${type}/${item.entity._id}`}>
                                        <Image
                                            src={this.renderImage(type, item)}
                                            alt={this.renderTitle(type, item)}
                                        />
                                    </Favorite>
                                </OverlayTrigger>
                            ))}
                        </Items>
                    </Category>
                ))}
            </Wrapper>
        );
    }
}

export default Favorites;
