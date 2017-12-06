import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

class Tooltip extends PureComponent {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        overlay: PropTypes.any.isRequired,
        children: PropTypes.any.isRequired,
    }
    render() {
        const { id, children, overlay, ...props } = this.props;
        return (
            <span>
                <span data-tip="" data-for={id}>{children}</span>
                <ReactTooltip {...props} id={id}>{overlay}</ReactTooltip>
            </span>
        );
    }
}

export default Tooltip;
