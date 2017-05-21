import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class DotsItem extends PureComponent {
    static defaultProps = {
        children: null,
    }
    static propTypes = {
        children: PropTypes.any,
    }
    render() {
        const { children } = this.props;
        return (
            <div className="dots-item">
                {children}
            </div>
        );
    }
}

export default DotsItem;
