import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../Icon';

class Arrow extends PureComponent {
    static defaultProps = {
        type: 'feature',
        onClick: null,
    }
    static propTypes = {
        direction: PropTypes.oneOf(['top', 'right', 'left', 'bottom']).isRequired,
        type: PropTypes.oneOf(['feature', 'simple']),
        onClick: PropTypes.func,
    }
    render() {
        const { direction, type, onClick } = this.props;
        return (
            <button
                className={cx({
                    'arrow-button': true,
                    [`arrow-${type}`]: type,
                    [`arrow-${direction}`]: direction,
                })}
                onClick={onClick}
            >
                <Icon type={`chevron-${direction}`} />
            </button>
        );
    }
}

export default Arrow;
