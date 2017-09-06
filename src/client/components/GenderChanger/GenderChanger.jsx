import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Wrapper,
    Button,
    Icon,
    Text,
    Divider,
    Line,
    DividerText,
} from './GenderChanger.styled';

class GenderChanger extends PureComponent {
    static defaultProps = {
        selected: null,
        onSelect: () => {},
        style: {},
    }
    static propTypes = {
        selected: PropTypes.oneOf(['', 'none', 'male', 'female']),
        onSelect: PropTypes.func,
        style: PropTypes.object,
    }
    selectGender = (gender) => {
        this.props.onSelect(gender);
    }
    render() {
        const { selected, style } = this.props;
        return (
            <Wrapper style={style}>
                <Button
                    gender="male"
                    active={selected === 'male'}
                    onClick={() => this.selectGender('male')}
                >
                    <Icon type="gender-male" />
                    <Text>Парень</Text>
                </Button>
                <Divider>
                    <Line />
                    <DividerText>или</DividerText>
                </Divider>
                <Button
                    gender="female"
                    active={selected === 'female'}
                    onClick={() => this.selectGender('female')}
                >
                    <Icon type="gender-female" />
                    <Text>Девушка</Text>
                </Button>
            </Wrapper>
        );
    }
}

export default GenderChanger;
