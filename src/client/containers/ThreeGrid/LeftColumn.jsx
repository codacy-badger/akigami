import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class LeftColumn extends PureComponent {
    static defaultProps = {
        children: null,
    }
    static propTypes = {
        children: PropTypes.any,
    }
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

export default LeftColumn;
