import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import cx from 'classnames';

import Icon from '../Icon';

class Arrow extends PureComponent {
    static defaultProps = {
        type: 'feature',
    }
    static propTypes = {
        direction: PropTypes.oneOf(['top', 'right', 'left', 'bottom']).isRequired,
        type: PropTypes.oneOf(['feature']),
    }
    render() {
        const { direction, type } = this.props;
        const props = omit(this.props, ['direction', 'className', 'type']);
        return (
            <button
                className={cx({
                    'arrow-button': true,
                    [`arrow-${type}`]: type,
                    [`arrow-${direction}`]: direction,
                })}
                {...props}
            >
                <Icon type={`chevron-${direction}`} />
            </button>
        );
    }
}

export default Arrow;
