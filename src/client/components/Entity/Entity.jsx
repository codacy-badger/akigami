import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

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
} from './Entity.styled';

class Entity extends PureComponent {
    static defaultProps = {
        image: null,
        genres: [],
        studio: null,
        type: 'anime',
        date: null,
        animeType: null,
    }
    static propTypes = {
        id: PropTypes.number.isRequired,
        image: PropTypes.string,
        type: PropTypes.string,
        title: PropTypes.string.isRequired,
        genres: PropTypes.array,
        studio: PropTypes.object,
        date: PropTypes.number,
        animeType: PropTypes.string,
    }
    renderOverlay = () => {
        const { id, genres, type, date, animeType } = this.props;
        const href = `/${type}/${id}`;
        return (
            <Overlay>
                <Link href={href} />
                <Button><Icon type="playlist-plus" /></Button>
                <Meta>
                    <MetaItem>{`${animeType},`}</MetaItem>
                    <MetaItem>{date}</MetaItem>
                </Meta>
                {genres.length > 0 && (
                    <Genres>
                        {genres.slice(0, 3).map(item => (
                            <Genre
                                key={item.id}
                                href={`/explore/${type}?genres=${item.id}`}
                            >
                                {item.name}
                            </Genre>
                        ))}
                    </Genres>
                )}
            </Overlay>
        );
    }
    render() {
        const { id, image, title, genres, studio, type } = this.props;
        const href = `/${type}/${id}`;
        return (
            <Block>
                <Poster>
                    <Image
                        href={href}
                        style={image && {
                            backgroundImage: `url(${image})`,
                        }}
                    />
                    {this.renderOverlay()}
                </Poster>
                <Info>
                    <Title href={href}>
                        {title}
                    </Title>
                    {(studio && studio.name && studio.id) && (
                        <Studio href={`/studio/${studio.id}`}>
                            {studio.name}
                        </Studio>
                    )}
                </Info>
            </Block>
        );
    }
}

export default Entity;
