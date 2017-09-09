import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Wrapper,
    Group,
    Label,
    Input,
} from './InputRange.styled';

function composeProps(current, next) {
    const obj = {};
    Object.keys(current).forEach((key) => {
        if (current[key] !== next[key]) {
            obj[key] = next[key];
        }
    });
    return obj;
}

function getMaxValue() {
    const maxValue = new Date();
    maxValue.setYear(maxValue.getFullYear() + 3);
    return maxValue.getFullYear();
}

class InputRange extends PureComponent {
    static defaultProps = {
        from: '',
        to: '',
        min: 1900,
        max: getMaxValue(),
        onChange: () => {},
    }
    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        from: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        to: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onChange: PropTypes.func,
    }
    constructor(props) {
        super(props);
        this.state = {
            from: props.from || '',
            to: props.to || '',
        };
    }
    componentWillReceiveProps(next) {
        this.setState(composeProps(this.props, next));
    }
    checkValueStrictly = (value) => {
        const { min, max } = this.props;
        if (value < min || value > max) return false;
        return true;
    }
    handleChangeValue = field => (e) => {
        this.setState({
            [field]: e.target.value,
        }, this.callback);
    }
    callback = () => {
        const { from, to } = this.state;
        const { onChange } = this.props;
        const out = { from: null, to: null };
        if (this.checkValueStrictly(from)) out.from = +from;
        if (this.checkValueStrictly(to)) out.to = +to;
        if (onChange) onChange(out);
    }
    render() {
        const { min, max } = this.props;
        const { from, to } = this.state;
        return (
            <Wrapper>
                <Group>
                    <Label>от</Label>
                    <Input
                        type="number"
                        value={from}
                        min={min}
                        max={max}
                        placeholder="год"
                        onChange={this.handleChangeValue('from')}
                    />
                </Group>
                <Group>
                    <Label>до</Label>
                    <Input
                        type="number"
                        value={to}
                        min={min}
                        max={max}
                        placeholder="год"
                        onChange={this.handleChangeValue('to')}
                    />
                </Group>
            </Wrapper>
        );
    }
}

export default InputRange;
