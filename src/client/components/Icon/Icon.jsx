import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Icon extends PureComponent {
    static propTypes = {
        type: PropTypes.string,
    }
    render() {
        const { type } = this.props;
        return <i className={cx({ mdi: true, [`mdi-${type}`]: type })} />;
    }
}

export default Icon;
