import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Block } from './Blank.styled';

class Blank extends PureComponent {
    static propTypes = {
        children: PropTypes.any.isRequired,
    }
    render() {
        const { children } = this.props;
        return (
            <Block>
                {children}
            </Block>
        );
    }
}

export default Blank;
