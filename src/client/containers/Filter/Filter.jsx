import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Scrollbars } from 'react-custom-scrollbars';
import Responsive from 'react-responsive';
import uniqBy from 'lodash/uniqBy';

import FilterBlock from '../../components/FilterBlock';
import FilterCheckbox from '../../components/FilterCheckbox';
import Icon from '../../components/Icon';
import {
    Wrapper,
    Title,
    Header,
    Close,
} from './Filter.styled';

class Filter extends PureComponent {
    static defaultProps = {
        open: false,
        onClose: () => {},
    }
    static propTypes = {
        onClose: PropTypes.func,
        open: PropTypes.bool,
    }
    state = {
        status: [],
        type: [],
    }
    changeStatus = (obj) => {
        const status = this.state.status;
        status.push(obj);
        const merged = uniqBy(status, 'value');
        const output = merged.map((e) => {
            if (e.value === obj.value) {
                e.active = obj.active;
            }
            return e;
        });
        this.setState({ status: output });
    }
    changeType = (obj) => {
        const type = this.state.type;
        type.push(obj);
        const merged = uniqBy(type, 'value');
        const output = merged.map((e) => {
            if (e.value === obj.value) {
                e.active = obj.active;
            }
            return e;
        });
        this.setState({ type: output });
    }
    render() {
        const { status, type } = this.state;
        const { open, onClose } = this.props;
        return (
            <Wrapper open={open}>
                <Scrollbars universal autoHide>
                    <Header>
                        <Title
                            style={{ padding: '44px 0 32px' }}
                        >
                            Фильтр
                        </Title>
                        <Responsive maxWidth={991}>
                            <Close
                                bsStyle="link"
                                onClick={onClose}
                            >
                                <Icon type="close" />
                            </Close>
                        </Responsive>
                    </Header>
                    <FilterBlock title="Статус">
                        <FilterCheckbox
                            negative
                            options={[
                                { value: 'announced', label: 'Анонсированно' },
                                { value: 'airing', label: 'Сейчас в эфире' },
                                { value: 'aired', label: 'Уже вышло' },
                            ]}
                            onChange={this.changeStatus}
                            value={status}
                        />
                    </FilterBlock>
                    <FilterBlock title="Тип">
                        <FilterCheckbox
                            negative
                            options={[
                                { value: 'tv', label: 'ТВ сериал' },
                                { value: 'movie', label: 'Фильм' },
                                { value: 'ova', label: 'OVA' },
                                { value: 'ona', label: 'ONA' },
                                { value: 'special', label: 'Спешл' },
                                { value: 'clip', label: 'Клип' },
                            ]}
                            onChange={this.changeType}
                            value={type}
                        />
                    </FilterBlock>
                </Scrollbars>
            </Wrapper>
        );
    }
}

export default Filter;
