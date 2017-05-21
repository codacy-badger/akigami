import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DotsItem from './DotsItem';

class DotsList extends PureComponent {
    static Item = DotsItem;
    static defaultProps = {
        children: null,
    }
    static propTypes = {
        children: PropTypes.any,
    }
    render() {
        const { children } = this.props;
        return (
            <div className="dots-list">
                {children}
            </div>
        );
    }
}

export default DotsList;
