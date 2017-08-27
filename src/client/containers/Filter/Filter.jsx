import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import Responsive from 'react-responsive';
import cx from 'classnames';
import uniqBy from 'lodash/uniqBy';

import FilterBlock from '../../components/FilterBlock';
import FilterCheckbox from '../../components/FilterCheckbox';
import Icon from '../../components/Icon';

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
            <div
                className={cx({
                    'filter-wrapper': true,
                    open,
                })}
            >
                <Scrollbars universal autoHide>
                    <div className="filter-header">
                        <h3
                            className="block-title"
                            style={{ padding: '44px 0 32px' }}
                        >
                            Фильтр
                        </h3>
                        <Responsive maxWidth={991}>
                            <Button
                                bsStyle="link"
                                className="filter-close"
                                onClick={onClose}
                            >
                                <Icon type="close" />
                            </Button>
                        </Responsive>
                    </div>
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
            </div>
        );
    }
}

export default Filter;
