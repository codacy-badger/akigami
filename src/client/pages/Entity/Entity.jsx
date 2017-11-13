import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import EntityHeader from '../../containers/EntityHeader';
import Wrapper from '../../components/Wrapper';
import Menu from '../../components/Menu';
// import {
//     Wrapper,
// } from './Entity.styled';

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
        this.props.ui.changeTransparented(true);
        this.getOffset();
    }
    componentWillUnmount() {
        this.props.ui.changeTransparented(false);
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
                123
            </Wrapper>
        );
    }
}

export default Entity;
