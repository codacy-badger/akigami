import React, { PureComponent } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Block from '../components/Block';
import TimelineItem from '../components/TimelineItem';

class Main extends PureComponent {
    render() {
        return (
            <div>
                <Grid className="content">
                    <Row>
                        <Col xs={12}>
                            <Block flex title="Далее в эфире">
                                <TimelineItem
                                    type="anime"
                                    entity={{
                                        id: 1,
                                        poster: 'https://desu.shikimori.org/system/animes/original/31933.jpg?1498925736',
                                        title: {
                                            romaji: 'JoJo no Kimyou na Bouken: Diamond wa Kudakenai',
                                        },
                                        description: {
                                            russian: 'Прибрежный городок Морио до поры до времени был тихим и ничем не примечательным, пока однажды там не появился древний артефакт «Лук и стрела», способный пробуждать в людях скрытые способности, также называемые «стенд». Это породило волну необычных и необычайных событий, среди которых особо выделяются исчезновения молодых девушек.\n\nОднако, никто не поднимает шум, и убийце живется весьма вольготно, пока однажды в Морио не прибывает молодой океанолог Джотаро Куджо. И теперь загадочному маньяку предстоит противостоять ему, а также Джоскэ Хигашикате, внебрачному сыну Джозефа, несокрушимому, как алмаз.',
                                        },
                                        genres: [{ title: 'Драма' }, { title: 'Приключения' }, { title: 'Экшен' }, { title: 'Комедия' }],
                                        nextEpisode: 1499472000000,
                                    }}
                                />
                                <TimelineItem
                                    type="anime"
                                    entity={{
                                        id: 1,
                                        poster: 'https://desu.shikimori.org/system/animes/original/31933.jpg?1498925736',
                                        title: {
                                            romaji: 'JoJo no Kimyou na Bouken: Diamond wa Kudakenai',
                                        },
                                        description: {
                                            russian: 'Прибрежный городок Морио до поры до времени был тихим и ничем не примечательным, пока однажды там не появился древний артефакт «Лук и стрела», способный пробуждать в людях скрытые способности, также называемые «стенд». Это породило волну необычных и необычайных событий, среди которых особо выделяются исчезновения молодых девушек.\n\nОднако, никто не поднимает шум, и убийце живется весьма вольготно, пока однажды в Морио не прибывает молодой океанолог Джотаро Куджо. И теперь загадочному маньяку предстоит противостоять ему, а также Джоскэ Хигашикате, внебрачному сыну Джозефа, несокрушимому, как алмаз.',
                                        },
                                        genres: [{ title: 'Драма' }, { title: 'Приключения' }, { title: 'Экшен' }, { title: 'Комедия' }],
                                        nextEpisode: 1499817600000,
                                    }}
                                />
                                <TimelineItem
                                    type="anime"
                                    entity={{
                                        id: 1,
                                        poster: 'https://desu.shikimori.org/system/animes/original/31933.jpg?1498925736',
                                        title: {
                                            romaji: 'JoJo no Kimyou na Bouken: Diamond wa Kudakenai',
                                        },
                                        description: {
                                            russian: 'Прибрежный городок Морио до поры до времени был тихим и ничем не примечательным, пока однажды там не появился древний артефакт «Лук и стрела», способный пробуждать в людях скрытые способности, также называемые «стенд». Это породило волну необычных и необычайных событий, среди которых особо выделяются исчезновения молодых девушек.\n\nОднако, никто не поднимает шум, и убийце живется весьма вольготно, пока однажды в Морио не прибывает молодой океанолог Джотаро Куджо. И теперь загадочному маньяку предстоит противостоять ему, а также Джоскэ Хигашикате, внебрачному сыну Джозефа, несокрушимому, как алмаз.',
                                        },
                                        genres: [{ title: 'Драма' }, { title: 'Приключения' }, { title: 'Экшен' }, { title: 'Комедия' }],
                                        nextEpisode: 1500508800000,
                                    }}
                                />
                            </Block>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Main;
