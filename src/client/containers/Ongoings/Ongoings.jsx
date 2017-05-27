import React, { PureComponent } from 'react';

import Block from '../../components/Block';
import Entity from '../../components/Entity';
import Carousel from '../../components/Carousel';
import Arrow from '../../components/Arrow';

const entities = [
    {
        id: 1,
        type: 'ТВ сериал',
        entityType: 'anime',
        title: 'Natsume Yuujinchou Roku',
        studio: 'Studio Shuka',
        poster: 'https://kawai.shikimori.org/system/animes/original/34591.jpg',
        genres: [
            {
                id: 1,
                name: 'Драма',
            },
            {
                id: 2,
                name: 'Фэнтези',
            },
        ],
        startedAt: 1496102400000,
    },
    {
        id: 2,
        entityType: 'anime',
        type: 'ТВ сериал',
        title: 'Shingeki no Kyojin Season 2',
        studio: 'Wit Studio',
        poster: 'https://moe.shikimori.org/system/animes/original/25777.jpg',
        genres: [
            {
                id: 1,
                name: 'Драма',
            },
            {
                id: 2,
                name: 'Экшен',
            },
        ],
        startedAt: 1495843200000,
    },
    {
        id: 3,
        entityType: 'anime',
        type: 'ТВ сериал',
        title: 'Boku no Hero Academia 2nd Season',
        studio: 'Bones',
        poster: 'https://kawai.shikimori.org/system/animes/original/33486.jpg',
        genres: [
            {
                id: 1,
                name: 'Экшен',
            },
            {
                id: 2,
                name: 'Комедия',
            },
        ],
        startedAt: 1495843200000,
    },
    {
        id: 4,
        entityType: 'anime',
        type: 'ТВ сериал',
        title: 'Saenai Heroine no Sodatekata ♭',
        studio: 'A-1 Pictures Inc.',
        poster: 'https://moe.shikimori.org/system/animes/original/30727.jpg',
        genres: [
            {
                id: 1,
                name: 'Комедия',
            },
            {
                id: 2,
                name: 'Этти',
            },
        ],
        startedAt: 1492128000000,
    },
    {
        id: 5,
        entityType: 'anime',
        type: 'ТВ сериал',
        title: 'Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?',
        studio: 'Satelight',
        poster: 'https://moe.shikimori.org/system/animes/original/33502.jpg',
        genres: [
            {
                id: 1,
                name: 'Драма',
            },
            {
                id: 2,
                name: 'Фэнтези',
            },
        ],
        startedAt: 1492128000000,
    },
    {
        id: 6,
        entityType: 'anime',
        type: 'ТВ сериал',
        title: 'Re:Creators',
        studio: 'TROYCA',
        poster: 'https://kawai.shikimori.org/system/animes/original/34561.jpg',
        genres: [
            {
                id: 1,
                name: 'Экшен',
            },
            {
                id: 2,
                name: 'Фэнтези',
            },
        ],
        startedAt: 1492128000000,
    },
];

class Ongoings extends PureComponent {
    componentDidMount() {
        Carousel.widthFix(this.carousel);
    }
    onRef = (ref) => {
        this.carousel = ref.innerSlider;
    }
    render() {
        return (
            <Block
                title="Новинки"
                buttons={(
                    <div>
                        <Arrow
                            type="simple"
                            direction="left"
                            onClick={() => Carousel.prevSlide(this.carousel)}
                        />
                        <Arrow
                            type="simple"
                            direction="right"
                            onClick={() => Carousel.nextSlide(this.carousel)}
                        />
                    </div>
                )}
            >
                <Carousel
                    carouselRef={this.onRef}
                    slidesToShow={6}
                    slidesToScroll={6}
                    arrows={false}
                    responsive={[
                        { breakpoint: 689, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                        { breakpoint: 767, settings: { slidesToShow: 3, slidesToScroll: 3 } },
                        { breakpoint: 991, settings: { slidesToShow: 4, slidesToScroll: 4 } },
                        { breakpoint: 1199, settings: { slidesToShow: 5, slidesToScroll: 5 } },
                    ]}
                >
                    {entities.map(entity => (
                        <div
                            key={entity.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Entity {...entity} />
                        </div>
                    ))}
                </Carousel>
            </Block>
        );
    }
}

export default Ongoings;
