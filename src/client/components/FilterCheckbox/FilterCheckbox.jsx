import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../Icon';

class FilterCheckbox extends PureComponent {
    static defaultProps = {
        options: [],
        value: [],
        onChange: () => {},
        negative: false,
    }
    static propTypes = {
        value: PropTypes.array,
        options: PropTypes.array,
        onChange: PropTypes.func,
        negative: PropTypes.bool,
    }
    constructor(props) {
        super(props);
        const state = {};
        props.options.forEach((e) => {
            state[`p_hover-${e.value}`] = false;
            if (e.negative) {
                state[`n_hover-${e.value}`] = false;
            }
        });
        this.state = state;
    }
    handleChange = (option, state) => {
        this.props.onChange({
            ...option,
            active: state,
        });
    }
    changeHoverable = (value, type, action) => {
        this.setState({
            [`${type === 'positive' ? 'p' : 'n'}_hover-${value}`]: action,
        });
    }
    render() {
        const { options, value, negative } = this.props;
        const merged = options.map((e) => {
            const val = value.filter(o => o.value === e.value);
            if (val) {
                e.active = val.length > 0 ? val[0].active : false;
            }
            return e;
        });
        return (
            <div className="filter-box">
                {merged.map(opt => (
                    <div
                        key={opt.value}
                        className={cx({
                            'filter-box-item': true,
                            'positive-hover': this.state[`p_hover-${opt.value}`],
                            'negative-hover': this.state[`n_hover-${opt.value}`],
                            'positive-active': opt.active === 'positive',
                            'negative-active': opt.active === 'negative',
                        })}
                    >
                        <button
                            className="filter-box-add"
                            onMouseEnter={() => this.changeHoverable(opt.value, 'positive', true)}
                            onMouseLeave={() => this.changeHoverable(opt.value, 'positive', false)}
                            onClick={() => this.handleChange(opt, opt.active === 'positive' ? false : 'positive')}
                        >
                            {opt.label}
                        </button>
                        {(negative || (!negative && opt.negative)) && (
                            <button
                                className="filter-box-del"
                                onMouseEnter={() => this.changeHoverable(opt.value, 'negative', true)}
                                onMouseLeave={() => this.changeHoverable(opt.value, 'negative', false)}
                                onClick={() => this.handleChange(opt, opt.active === 'negative' ? false : 'negative')}
                            >
                                <Icon type="minus" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

export default FilterCheckbox;
