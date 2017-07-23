import React, { PureComponent } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';

import Block from '../../components/Block';
import TimelineItem from '../../components/TimelineItem';

addStyle(Button, 'dark');

const demo = [{
    id: 1,
    cover: 'https://cdn.anilist.co/img/dir/anime/banner/97766-lgzaojRYIWSR.jpg',
    title: {
        romaji: 'Gamers!',
    },
    genres: [{ title: 'Комедия' }, { title: 'Драма' }, { title: 'Этти' }, { title: 'Романтика' }, { title: 'Повседневность' }],
    nextEpisode: 1500508800000,
}, {
    id: 2,
    cover: 'https://fateapocryphathetranslation.files.wordpress.com/2014/09/fat018-english.jpg',
    title: {
        romaji: 'Fate/Apocrypha',
    },
    genres: [{ title: 'Экшен' }, { title: 'Фэнтези' }],
    nextEpisode: 1500595200000,
}, {
    id: 3,
    cover: 'https://theglorioblog.files.wordpress.com/2017/07/pp1school.jpg',
    title: {
        romaji: 'Princess Principal',
    },
    genres: [{ title: 'Экшен' }, { title: 'Приключения' }],
    nextEpisode: 1500681600000,
}, {
    id: 4,
    cover: 'https://cdn.anilist.co/img/dir/anime/banner/98320-da7E8NZKdwUm.jpg',
    title: {
        romaji: 'Koi to Uso',
    },
    genres: [{ title: 'Драма' }, { title: 'Романтика' }],
    nextEpisode: 1500768000000,
}, {
    id: 5,
    cover: 'https://i.ytimg.com/vi/viNXBNUaG6A/maxresdefault.jpg',
    title: {
        romaji: 'Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e',
    },
    genres: [{ title: 'Комедия' }, { title: 'Романтика' }],
    nextEpisode: 1500940800000,
}, {
    id: 6,
    cover: 'https://cdn.anilist.co/img/dir/anime/banner/97863-dUQTCNacPxWL.png',
    title: {
        romaji: 'Hajimete no Gal',
    },
    genres: [{ title: 'Комедия' }, { title: 'Этти' }, { title: 'Романтика' }],
    nextEpisode: 1500940800000,
}];

class Timeline extends PureComponent {
    render() {
        return (
            <section className="timeline-wrap">
                <Grid className="content">
                    <Row>
                        <Col xs={12}>
                            <Block
                                flex
                                title="Далее в эфире"
                                buttons={(
                                    <Button
                                        bsSize="sm"
                                        bsStyle="dark"
                                        componentClass="a"
                                        href="/calendar"
                                    >
                                        В календарь
                                    </Button>
                                )}
                            >
                                {demo.map(item => (
                                    <TimelineItem key={item.id} entity={item} />
                                ))}
                            </Block>
                        </Col>
                    </Row>
                </Grid>
            </section>
        );
    }
}

export default Timeline;
