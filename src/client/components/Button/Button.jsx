import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Button extends PureComponent {
    static defaultProps = {
        children: null,
        onClick: null,
    }
    static propTypes = {
        children: PropTypes.any,
        onClick: PropTypes.func,
    }
    render() {
        const { children, onClick } = this.props;
        return (
            <button onClick={onClick} className="button">
                {children}
            </button>
        );
    }
}

export default Button;
