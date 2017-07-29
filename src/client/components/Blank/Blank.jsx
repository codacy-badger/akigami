import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Blank extends PureComponent {
    static propTypes = {
        children: PropTypes.any.isRequired,
    }
    render() {
        const { children } = this.props;
        return (
            <div className="blank-block">
                {children}
            </div>
        );
    }
}

export default Blank;
