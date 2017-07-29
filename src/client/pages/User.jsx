import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import Chart from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';


import Threed from '../containers/Threed';
import Block from '../components/Block';

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
                                <h5 className="block-subtitle">По предпочтениям</h5>
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
                        Статистика, музыка ещё что-то
                    </Left>
                    <Center>
                        О себе, что-то в центре, наверное фид
                    </Center>
                    <Right>
                        Избранное, друзья ещё что-то
                    </Right>
                </Threed>
            </div>
        );
    }
}

export default User;
