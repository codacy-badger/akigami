import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Responsive from 'react-responsive';

import EntityHeader from '../../containers/EntityHeader';
import Wrapper from '../../components/Wrapper';
import Trailer from '../../components/Trailer';
import Content from '../../components/Content';
import Menu from '../../components/Menu';
import Block from '../../components/Block';
import {
    Grid,
    LeftColumn,
    CenterColumn,
    RightColumn,
    AutoColumn,
    Poster,
    Description,
} from './Entity.styled';

import mock from './Entity.mock';


@inject(s => ({
    ui: s.app.ui,
}))
@observer
class Entity extends Component {
    static defaultProps = {
        data: mock,
    }
    static propTypes = {
        data: PropTypes.object,
        ui: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['anime', 'manga', 'novel']).isRequired,
    }
    state = {
        offset: 0,
    }
    componentDidMount() {
        if (this.getCover()) {
            this.props.ui.changeTransparented(true);
        }
        this.getOffset();
    }
    componentWillUnmount() {
        if (this.getCover()) {
            this.props.ui.changeTransparented(false);
        }
    }
    getCover() {
        const { data } = this.props;
        return !!data?.entity?.cover?.large;
    }
    getOffset() {
        if (typeof document !== 'undefined') {
            const height = window.innerHeight
                || document.body.clientHeight
                || document.documentElement.clientHeight;

            this.setState({
                offset: height - 48,
            });
        }
    }
    renderCharacters = () => (
        <Block
            shadow
            colored
            padded
            title="Персонажи"
            buttons={(
                <Button bsSize="xs">Все</Button>
            )}
        >
            Здесь будут персонажи
        </Block>
    )
    renderStaff = () => (
        <Block
            shadow
            colored
            padded
            title="Авторы"
            buttons={(
                <Button bsSize="xs">Все</Button>
            )}
        >
            Здесь будут авторы и прочий стафф
        </Block>
    )
    renderTracks = () => (
        <Block
            shadow
            colored
            padded
            title="Песни"
            buttons={(
                <Button bsSize="xs">Все</Button>
            )}
        >
            Здесь будут треки использованные в тайтле
        </Block>
    )
    renderFriends = () => (
        <Block
            shadow
            colored
            padded
            title="Друзья"
            buttons={(
                <Button bsSize="xs">Все</Button>
            )}
        >
            Здесь будут друзья, в чьих списках присутствует данный тайтл 
        </Block>
    )
    renderClubs = () => (
        <Block
            shadow
            colored
            padded
            title="Клубы"
            buttons={(
                <Button bsSize="xs">Все</Button>
            )}
        >
            Здесь будут клубы, специализирующиеся на данном тайтле
        </Block>
    )
    renderReviews = () => (
        <Block
            shadow
            colored
            padded
            title="Рецензии"
            buttons={(
                <Button bsSize="xs">Все</Button>
            )}
        >
            Здесь будут рецензии/отзывы от пользователей закончивших данный тайтл
        </Block>
    )
    renderRecomendations = () => (
        <Block
            shadow
            colored
            padded
            title="Рекомендации"
            buttons={(
                <Button bsSize="xs">Все</Button>
            )}
        >
            Здесь будут рекомендации других тайтлов от пользователей
        </Block>
    )
    renderRelations = () => (
        <Block
            shadow
            colored
            padded
            title="Похожее"
            buttons={(
                <Button bsSize="xs">Все</Button>
            )}
        >
            Здесь будут похожие тайтлы
        </Block>
    )
    renderRating = () => (
        <Block
            shadow
            colored
            padded
        >
            Здесь будет рейтинг энтити
        </Block>
    )
    renderDescription = () => {
        const { data } = this.props;
        return (
            <Block padded bordered>
                <Description>
                    {data.entity.description.russian}
                </Description>
            </Block>
        );
    }
    renderPoster = () => {
        const { data } = this.props;
        return (
            <Block shadow>
                <Poster
                    src={data.entity.poster.medium}
                    alt={data.entity.title.romaji}
                    width="100%"
                />
            </Block>
        );
    }
    renderTrailer = () => {
        const { data } = this.props;
        const trailer = data.entity.videos[data.entity.videos.length - 1];
        return (
            <Trailer
                image={trailer.thumbnail}
                url={trailer.url}
            />
        );
    }
    renderInfo = () => (
        <Block>
            Здесь будет дополнительная информация о тайтле
        </Block>
    )
    render() {
        const { offset } = this.state;
        const { data, type } = this.props;
        return (
            <Wrapper transparented>
                <EntityHeader data={data.entity} type={type} />
                <Menu
                    sticky
                    offsetTop={offset}
                    onSelect={e => console.log(e)}
                    selected="overview"
                    items={[{
                        title: 'Обзор',
                        tab: 'overview',
                    }, {
                        title: 'Смотреть',
                        tab: 'watch',
                    }, {
                        title: 'Персонажи',
                        tab: 'characters',
                    }, {
                        title: 'Авторы',
                        tab: 'staff',
                    }, {
                        title: 'Похожее',
                        tab: 'similar',
                    }]}
                />
                <Content>
                    <Grid>
                        <Responsive minWidth={768}>
                            <LeftColumn>
                                {this.renderPoster()}
                                {this.renderTrailer()}
                                {this.renderInfo()}
                            </LeftColumn>
                        </Responsive>
                        <CenterColumn>
                            <Responsive maxWidth={767}>
                                <Grid>
                                    <LeftColumn>
                                        {this.renderPoster()}
                                        {this.renderTrailer()}
                                    </LeftColumn>
                                    <AutoColumn>
                                        {this.renderDescription()}
                                        {this.renderInfo()}
                                    </AutoColumn>
                                </Grid>
                            </Responsive>
                            <Responsive minWidth={768}>
                                {this.renderDescription()}
                            </Responsive>
                            {this.renderRating()}
                            <Responsive maxWidth={1199}>
                                <Grid>
                                    <RightColumn>
                                        {this.renderCharacters()}
                                    </RightColumn>
                                    <RightColumn>
                                        {this.renderStaff()}
                                    </RightColumn>
                                </Grid>
                            </Responsive>
                            {this.renderRelations()}
                            {this.renderRecomendations()}
                            <Responsive maxWidth={1199}>
                                <Grid>
                                    <RightColumn>
                                        {this.renderTracks()}
                                    </RightColumn>
                                    <RightColumn>
                                        {this.renderFriends()}
                                    </RightColumn>
                                </Grid>
                                {this.renderClubs()}
                            </Responsive>
                            {this.renderReviews()}
                        </CenterColumn>
                        <Responsive minWidth={1200}>
                            <RightColumn>
                                {this.renderCharacters()}
                                {this.renderStaff()}
                                {this.renderTracks()}
                                {this.renderFriends()}
                                {this.renderClubs()}
                            </RightColumn>
                        </Responsive>
                    </Grid>
                </Content>
            </Wrapper>
        );
    }
}

export default Entity;
