import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Threed from '../../containers/Threed';
import EntityHeader from '../../containers/EntityHeader';
import Wrapper from '../../components/Wrapper';
import Menu from '../../components/Menu';
import Block from '../../components/Block';
// import {
//     Wrapper,
// } from './Entity.styled';

import mock from './Entity.mock';

const { Left, Center, Right } = Threed;

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
                <Threed>
                    <Left>
                        <Block shadow>
                            <img
                                src={data.entity.poster.medium}
                                alt={data.entity.title.romaji}
                                width="100%"
                            />
                        </Block>
                    </Left>
                    <Center>
                        123
                    </Center>
                    <Right>
                        123
                    </Right>
                </Threed>
            </Wrapper>
        );
    }
}

export default Entity;
