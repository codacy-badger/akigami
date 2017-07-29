import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import Chart from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';

import Threed from '../containers/Threed';
import Block from '../components/Block';
import Track from '../components/Track';

import entitiesChart from '../charts/entities';
import activityChart from '../charts/activity';

const { Left, Right, Center } = Threed;

if (typeof window !== 'undefined') {
    HighchartsMore(Chart.Highcharts);
    SolidGauge(Chart.Highcharts);
}

const demo = {
    cover: 'http://i.imgur.com/ycHP6KX.jpg',
    avatar: 'https://pp.userapi.com/c639416/v639416296/2bfdb/XE8roc1owEs.jpg',
    displayName: 'Yukioru',
    status: 'Какие-то мемы',
    about: 'Здесь должна быть информация обо мне но, так как это текст-заглушка, её здесь нет.\n\nНо у вас этот блок точно будет заполнен, или его не будет видно(или он будет пустой) если вы не заполните информацию.',
};

const track = {
    type: 'Эндинг',
    title: 'ANGELNOIR',
};

const album = {
    cover: {
        small: 'https://c.okmusic.jp/news_details/images/45441638/large.jpg',
    },
};

const artist = {
    firstName: {
        romaji: 'Aoba',
    },
    lastName: {
        romaji: 'Ichiko',
    },
};

const anime = {
    _id: 1,
    title: {
        romaji: '18if',
    },
};

@inject(s => ({
    ui: s.app.ui,
}))
@observer
class User extends PureComponent {
    static propTypes = {
        ui: PropTypes.object.isRequired,
    }
    componentDidMount() {
        this.props.ui.changeTransparented(true);
    }
    componentWillUnmount() {
        this.props.ui.changeTransparented(false);
    }
    render() {
        return (
            <div className="transparented">
                <div
                    className="user-header"
                    style={{
                        backgroundImage: `url(${demo.cover})`,
                    }}
                >
                    <Grid className="user-header-inner">
                        <Row>
                            <Col xs={12}>
                                <div className="user-header-bottom">
                                    <img
                                        className="user-avatar"
                                        src={demo.avatar}
                                        alt={demo.displayName}
                                    />
                                    <div className="user-header-info">
                                        <h2>{demo.displayName}</h2>
                                        {demo.status && <p>{demo.status}</p>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <Threed>
                    <Left>
                        <Block title="Статистика">
                            <div className="stats-block">
                                <h5 className="block-subtitle" style={{ marginBottom: '-4px' }}>По предпочтениям</h5>
                                <Chart config={entitiesChart} />
                            </div>
                            <div className="stats-block">
                                <h5 className="block-subtitle">Активность за неделю</h5>
                                <Tabs
                                    defaultActiveKey={1}
                                    animation={false}
                                    id="activity-tabs"
                                >
                                    <Tab eventKey={1} title="Аниме">
                                        <Chart config={activityChart} />
                                        <div className="activity-legend">
                                            <div className="activity-legend-item">
                                                <div
                                                    className="activity-legend-dot"
                                                    style={{ backgroundColor: '#ffbd88' }}
                                                />
                                                <span>Запланировано</span>
                                            </div>
                                            <div className="activity-legend-item">
                                                <div
                                                    className="activity-legend-dot"
                                                    style={{ backgroundColor: '#008cf0' }}
                                                />
                                                <span>Смотрю</span>
                                            </div>
                                            <div className="activity-legend-item">
                                                <div
                                                    className="activity-legend-dot"
                                                    style={{ backgroundColor: '#00a86b' }}
                                                />
                                                <span>Завершено</span>
                                            </div>
                                            <div className="activity-legend-item">
                                                <div
                                                    className="activity-legend-dot"
                                                    style={{ backgroundColor: '#d54343' }}
                                                />
                                                <span>Брошено</span>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey={2} title="Манга">
                                        <Chart config={activityChart} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </Block>
                        <Block title="Музыка">
                            <Track
                                track={track}
                                anime={anime}
                                artist={artist}
                                album={album}
                            />
                        </Block>
                    </Left>
                    <Center>
                        <Block title="О себе">
                            <div className="user-about">{demo.about}</div>
                        </Block>
                        <Block title="Лента">
                            Здесь будет ваша лента
                        </Block>
                    </Center>
                    <Right>
                        <Block title="Избранное">
                            Избранная анима, манга, люди, персонажи.
                        </Block>
                        <Block title="Подписки">
                            Мои подписки
                        </Block>
                        <Block title="Подписчики">
                            Мои подписчики
                        </Block>
                    </Right>
                </Threed>
            </div>
        );
    }
}

export default User;
