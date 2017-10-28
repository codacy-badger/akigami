import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import EntityModal from '../EntityModal';

import {
    Block,
    Overlay,
    Poster,
    Image,
    Info,
    Title,
    Genres,
    Genre,
    Studio,
    Meta,
    Link,
    MetaItem,
    Button,
    Label,
} from './Entity.styled';

class Entity extends PureComponent {
    static defaultProps = {
        status: null,
    }
    static propTypes = {
        type: PropTypes.oneOf(['anime', 'manga', 'novel']).isRequired,
        status: PropTypes.oneOf([
            'planned',
            'watching',
            'onhold',
            'completed',
            'dropped',
        ]),
        entity: PropTypes.object.isRequired,
    }
    static typeConverter(type) {
        switch (type) {
        case 'tv': return 'TV сериал';
        case 'movie': return 'Фильм';
        case 'ova': return 'OVA';
        case 'ona': return 'ONA';
        case 'special': return 'Спэшл';
        default: return '';
        }
    }
    static statusConverter(status) {
        switch (status) {
        case 'planned': return {
            color: '#a2a2a2',
            title: 'В планах',
        };
        case 'watching': return {
            color: '#6fbb1c',
            title: 'Смотрю',
        };
        case 'onhold': return {
            color: '#e6b11a',
            title: 'Отложено',
        };
        case 'completed': return {
            color: '#1fbbbb',
            title: 'Завершено',
        };
        case 'dropped': return {
            color: '#d54343',
            title: 'Брошено',
        };
        default: return {
            color: '#2d2d2d',
            title: 'Неизвестно',
        };
        }
    }
    renderOverlay = () => {
        const { type, entity, status } = this.props;
        const href = `/${type}/${entity.id}`;
        return (
            <Overlay>
                <EntityModal id={entity.id} entity={entity} type={type} status={status} />
                <Button><Icon type={`playlist-${status ? 'check' : 'plus'}`} /></Button>
                <Meta>
                    {entity.type && (
                        <MetaItem>
                            {`${this.constructor.typeConverter(entity.type)},`}
                        </MetaItem>
                    )}
                    {(entity.airing && entity.airing.start) && (
                        <MetaItem>
                            {new Date(entity.airing.start).getFullYear()}
                        </MetaItem>
                    )}
                </Meta>
                {(entity.genres && entity.genres.length > 0) && (
                    <Genres>
                        {entity.genres.slice(0, 3).map(item => (
                            <Genre
                                key={item.id}
                                href={`/explore/${type}?genres=${item.id}`}
                            >
                                {item.title}
                            </Genre>
                        ))}
                    </Genres>
                )}
            </Overlay>
        );
    }
    render() {
        const { type, entity, status } = this.props;
        const href = `/${type}/${entity.id}`;
        const label = this.constructor.statusConverter(status);
        return (
            <Block>
                <Poster>
                    {status && (
                        <Label color={label.color}>{label.title}</Label>
                    )}
                    <Image src={entity.poster.medium} />
                    {this.renderOverlay()}
                </Poster>
                <Info>
                    <Title href={href}>
                        {entity.title.romaji || 'Неизвестное название'}
                    </Title>
                    {entity.studio && (
                        <Studio href={`/studio/${entity.studio.id}`}>
                            {entity.studio.title}
                        </Studio>
                    )}
                </Info>
            </Block>
        );
    }
}

export default Entity;
