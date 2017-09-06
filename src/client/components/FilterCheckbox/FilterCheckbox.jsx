import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import {
    Box,
    Item,
    Add,
    Del,
} from './FilterCheckbox.styled';

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
            <Box>
                {merged.map(opt => (
                    <Item
                        key={opt.value}
                        positiveHover={this.state[`p_hover-${opt.value}`]}
                        negativeHover={this.state[`n_hover-${opt.value}`]}
                        positiveActive={opt.active === 'positive'}
                        negativeActive={opt.active === 'negative'}
                    >
                        <Add
                            onMouseEnter={() => this.changeHoverable(opt.value, 'positive', true)}
                            onMouseLeave={() => this.changeHoverable(opt.value, 'positive', false)}
                            onClick={() => this.handleChange(opt, opt.active === 'positive' ? false : 'positive')}
                        >
                            {opt.label}
                        </Add>
                        {(negative || (!negative && opt.negative)) && (
                            <Del
                                onMouseEnter={() => this.changeHoverable(opt.value, 'negative', true)}
                                onMouseLeave={() => this.changeHoverable(opt.value, 'negative', false)}
                                onClick={() => this.handleChange(opt, opt.active === 'negative' ? false : 'negative')}
                            >
                                <Icon type="minus" />
                            </Del>
                        )}
                    </Item>
                ))}
            </Box>
        );
    }
}

export default FilterCheckbox;
