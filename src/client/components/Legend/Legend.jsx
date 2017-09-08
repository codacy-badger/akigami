import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Legend.styled';

class Legend extends PureComponent {
    static defaultProps = {
        children: null,
    }
    static propTypes = {
        children: PropTypes.any,
    }
    render() {
        const { children } = this.props;
        return (
            <Wrapper>
                {children}
            </Wrapper>
        );
    }
}

export default Legend;
