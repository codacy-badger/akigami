import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Icon extends PureComponent {
    static defaultProps = {
        className: null,
    }
    static propTypes = {
        type: PropTypes.string.isRequired,
        className: PropTypes.string,
    }
    render() {
        const { type, className } = this.props;
        return <i className={cx({ mdi: true, [`mdi-${type}`]: type, [className]: className })} />;
    }
}

export default Icon;
