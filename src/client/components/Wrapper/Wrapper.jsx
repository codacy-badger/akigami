import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Div from './Wrapper.styled';

class Wrapper extends PureComponent {
    static defaultProps = {
        children: null,
        transparented: false,
        opaque: false,
    }
    static propTypes = {
        children: PropTypes.any,
        opaque: PropTypes.bool,
        transparented: PropTypes.bool,
    }
    render() {
        const { children, opaque, transparented } = this.props;
        return (
            <Div transparented={transparented} opaque={opaque}>
                {children}
            </Div>
        );
    }
}

export default Wrapper;
