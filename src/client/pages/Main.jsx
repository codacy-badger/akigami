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
                            <Block title="Далее в эфире">
                                <TimelineItem
                                    type="anime"
                                    entity={{
                                        id: 1,
                                        poster: 'https://desu.shikimori.org/system/animes/original/31933.jpg?1498925736',
                                        title: {
                                            romaji: 'JoJo no Kimyou na Bouken: Diamond wa Kudakenai',
                                        },
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
