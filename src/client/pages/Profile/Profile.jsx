import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Chart from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import {
    Tabs,
    Tab,
    Button,
} from 'react-bootstrap';

import Tooltip from '../../components/Tooltip';
import Favorites from '../../containers/Favorites';
import Threed from '../../containers/Threed';
import Feed from '../../containers/Feed';
import Block from '../../components/Block';
import Track from '../../components/Track';
import Follows from '../../components/Follows';
import Menu from '../../components/Menu';
import Wrapper from '../../components/Wrapper';
import Legend from '../../components/Legend';
import LegendItem from '../../components/LegendItem';
import Stats from '../../components/Stats';
import Icon from '../../components/Icon';

import entitiesChart from '../../charts/entities';
import activityChart from '../../charts/activity';

import ProfileStore from './Profile.store';

import {
    Header,
    Inner,
    Row,
    Col,
    Bottom,
    Avatar,
    Info,
    User,
    Status,
    Settings,
    About,
    CoverActions,
    CoverAction,
} from './Profile.styled';

import { Dropdown, DropdownItem } from '../../components/Dropdown';

const { Left, Right, Center } = Threed;

if (typeof window !== 'undefined') {
    HighchartsMore(Chart.Highcharts);
    SolidGauge(Chart.Highcharts);
}

const track = {
    _id: 1,
    type: 'Эндинг',
    title: 'ANGELNOIR',
};

const album = {
    cover: {
        small: 'https://c.okmusic.jp/news_details/images/45441638/large.jpg',
    },
};

const artist = {
    _id: 1,
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

const favorites = [{
    _id: 1,
    type: 'character',
    entity: {
        _id: 1,
        firstName: {
            romaji: 'Freyja',
        },
        lastName: {
            romaji: 'Wion',
        },
        photo: {
            small: 'https://myanimelist.cdn-dena.com/images/characters/6/306722.jpg',
        },
    },
}, {
    _id: 2,
    type: 'character',
    entity: {
        _id: 2,
        firstName: {
            romaji: 'Nagisa',
        },
        lastName: {
            romaji: 'Motomiya',
        },
        photo: {
            small: 'https://myanimelist.cdn-dena.com/images/characters/7/167279.jpg',
        },
    },
}, {
    _id: 3,
    type: 'track',
    entity: {
        _id: 3,
        album,
        track,
        artist,
        anime,
    },
}, {
    _id: 4,
    type: 'anime',
    entity: {
        _id: 1,
        title: {
            romaji: 'Amanchu',
        },
        poster: {
            small: 'https://myanimelist.cdn-dena.com/images/anime/6/80810.jpg',
        },
    },
}, {
    _id: 5,
    type: 'anime',
    entity: {
        _id: 2,
        title: {
            romaji: 'Macross Δ',
        },
        poster: {
            small: 'https://myanimelist.cdn-dena.com/images/anime/5/79376.jpg',
        },
    },
}, {
    _id: 6,
    type: 'anime',
    entity: {
        _id: 3,
        title: {
            romaji: 'Aria The Origination',
        },
        poster: {
            small: 'https://myanimelist.cdn-dena.com/images/anime/6/77623.jpg',
        },
    },
}, {
    _id: 7,
    type: 'people',
    entity: {
        _id: 1,
        firstName: {
            romaji: 'Aki',
        },
        lastName: {
            romaji: 'Toyosaki',
        },
        photo: {
            small: 'https://myanimelist.cdn-dena.com/images/voiceactors/2/34661.jpg',
        },
    },
}, {
    _id: 8,
    type: 'people',
    entity: {
        _id: 1,
        firstName: {
            romaji: 'Minori',
        },
        lastName: {
            romaji: 'Suzuki',
        },
        photo: {
            small: 'https://myanimelist.cdn-dena.com/images/voiceactors/3/42334.jpg',
        },
    },
}];

@inject(s => ({
    app: s.app,
    ui: s.app.ui,
    myUser: s.app.user,
}))
@observer
class Profile extends Component {
    static propTypes = {
        app: PropTypes.object.isRequired,
        ui: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        myUser: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.store = new ProfileStore(props.app, props.user);
    }
    componentDidMount() {
        this.props.ui.changeTransparented(true);
    }
    componentWillUnmount() {
        this.props.ui.changeTransparented(false);
    }
    isOwner = () => {
        const { myUser } = this.props;
        return this.store.id === myUser.id;
    }
    render() {
        const { myUser } = this.props;
        return (
            <Wrapper transparented>
                <Header
                    style={{
                        backgroundImage: `url(${this.store.getCover})`,
                    }}
                >
                    <Inner>
                        <Row>
                            <Col xs={12}>
                                <CoverActions>
                                    <Tooltip
                                        id="cover-upload"
                                        overlay="Изменить обложку"
                                        place="bottom"
                                    >
                                        <CoverAction
                                            onClick={() => this.store.callUploader('cover')}
                                            bsSize="sm"
                                        >
                                            <Icon type="vector-difference-ba" />
                                        </CoverAction>
                                    </Tooltip>
                                    <Tooltip
                                        id="cover-remove"
                                        overlay="Удалить обложку"
                                        place="bottom"
                                    >
                                        <CoverAction
                                            onClick={() => this.store.removeImage('cover')}
                                            bsSize="sm"
                                        >
                                            <Icon type="selection-off" />
                                        </CoverAction>
                                    </Tooltip>
                                </CoverActions>
                                <Bottom>
                                    <Dropdown
                                        trigger={(
                                            <Avatar
                                                src={this.store.getAvatar}
                                                alt={this.store.displayName}
                                            />
                                        )}
                                    >
                                        <DropdownItem onClick={() => this.store.callUploader('avatar')}>Изменить аватар</DropdownItem>
                                        {this.store.getAvatar !== '/no-photo.jpg' && <DropdownItem onClick={() => this.store.removeImage('avatar')}>Удалить аватар</DropdownItem>}
                                    </Dropdown>

                                    <Info>
                                        <User>{this.store.displayName}</User>
                                        {this.store.status && (
                                            <Status>{this.store.status}</Status>
                                        )}
                                        {this.isOwner() && (
                                            <Settings
                                                bsSize="sm"
                                                bsStyle="transparent"
                                                componentClass="a"
                                                href="/settings"
                                            >
                                                Настройки
                                            </Settings>
                                        )}
                                    </Info>
                                </Bottom>
                            </Col>
                        </Row>
                    </Inner>
                </Header>
                <Menu
                    sticky
                    onSelect={e => console.log(e)}
                    selected="activity"
                    items={[{
                        title: 'Активность',
                        tab: 'activity',
                    }, {
                        title: 'Библиотека',
                        tab: 'library',
                    }, {
                        title: 'Подписчики',
                        tab: 'followers',
                        count: 0,
                    }, {
                        title: 'Подписки',
                        tab: 'following',
                        count: 0,
                    }, {
                        title: 'Клубы',
                        tab: 'clubs',
                    }]}
                />
                <Threed>
                    <Left>
                        <Block colored padded shadow title="Статистика">
                            <Stats
                                title="По предпочтениям"
                                styleTitle={{ marginBottom: '-4px' }}
                            >
                                <Chart config={entitiesChart} />
                            </Stats>
                            <Stats title="По типам">
                                <Tabs
                                    defaultActiveKey={1}
                                    animation={false}
                                    id="activity-tabs"
                                >
                                    <Tab eventKey={1} title="Аниме">
                                        <Chart config={activityChart} />
                                        <Legend>
                                            <LegendItem color="#ffbd88">
                                                Запланировано
                                            </LegendItem>
                                            <LegendItem color="#008cf0">
                                                Смотрю
                                            </LegendItem>
                                            <LegendItem color="#00a86b">
                                                Завершено
                                            </LegendItem>
                                            <LegendItem color="#d54343">
                                                Брошено
                                            </LegendItem>
                                        </Legend>
                                    </Tab>
                                    <Tab eventKey={2} title="Манга">
                                        <Chart config={activityChart} />
                                        <Legend>
                                            <LegendItem color="#ffbd88">
                                                Запланировано
                                            </LegendItem>
                                            <LegendItem color="#008cf0">
                                                Читаю
                                            </LegendItem>
                                            <LegendItem color="#00a86b">
                                                Завершено
                                            </LegendItem>
                                            <LegendItem color="#d54343">
                                                Брошено
                                            </LegendItem>
                                        </Legend>
                                    </Tab>
                                </Tabs>
                            </Stats>
                        </Block>
                        <Block
                            colored
                            padded
                            shadow
                            title="Музыка"
                            buttons={(
                                <Button bsSize="xs">Все песни</Button>
                            )}
                        >
                            <Track
                                track={track}
                                anime={anime}
                                artist={artist}
                                album={album}
                            />
                            <Track
                                track={track}
                                anime={anime}
                                artist={artist}
                                album={album}
                            />
                            <Track
                                track={track}
                                anime={anime}
                                artist={artist}
                                album={album}
                            />
                            <Track
                                track={track}
                                anime={anime}
                                artist={artist}
                                album={album}
                            />
                            <Track
                                track={track}
                                anime={anime}
                                artist={artist}
                                album={album}
                            />
                            <Track
                                track={track}
                                anime={anime}
                                artist={artist}
                                album={album}
                            />
                        </Block>
                        <Block
                            colored
                            padded
                            shadow
                            title="Клубы"
                            buttons={(
                                <Button bsSize="xs">Ещё</Button>
                            )}
                        >
                            <Follows
                                entities={[1].map(() => this.store)}
                                blankText="Вы не состоите ни в каком клубе."
                            />
                        </Block>
                    </Left>
                    <Center>
                        {this.store.about && (
                            <Block colored padded bordered shadow title="О себе">
                                <About>{this.store.about}</About>
                            </Block>
                        )}
                        <Block>
                            <Feed userId={this.store.id} />
                        </Block>
                    </Center>
                    <Right>
                        <Block
                            colored
                            padded
                            shadow
                            title="Избранное"
                            buttons={(
                                <Button bsSize="xs">Ещё</Button>
                            )}
                        >
                            <Favorites entities={favorites} />
                        </Block>
                        <Block
                            colored
                            padded
                            shadow
                            title="Подписки"
                            buttons={(
                                <Button bsSize="xs">Ещё</Button>
                            )}
                        >
                            <Follows
                                entities={[1].map(() => this.store)}
                                blankText="У вас пока нет подписок."
                            />
                        </Block>
                        <Block
                            colored
                            padded
                            shadow
                            title="Подписчики"
                            buttons={(
                                <Button bsSize="xs">Ещё</Button>
                            )}
                        >
                            <Follows
                                entities={[1].map(() => this.store)}
                                blankText="У вас пока нет подписчиков. Подружитесь с кем нибудь ;)"
                            />
                        </Block>
                    </Right>
                </Threed>
            </Wrapper>
        );
    }
}

export default Profile;
