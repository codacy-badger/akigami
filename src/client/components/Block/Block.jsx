import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Block extends PureComponent {
    static defaultProps = {
        title: null,
        size: 'large',
        children: null,
        buttons: null,
        className: null,
        flex: false,
    }
    static propTypes = {
        title: PropTypes.string,
        buttons: PropTypes.any,
        flex: PropTypes.bool,
        size: PropTypes.oneOf(['large', 'small', 'tiny']),
        children: PropTypes.any,
        className: PropTypes.string,
    }
    render() {
        const { buttons, title, size, children, flex, className } = this.props;
        const Title = size === 'large' ? 'h3' : 'h4';
        return (
            <div className={cx({ block: true, [size]: size, flex, [className]: className })}>
                {title && (
                    <div className="block-header">
                        <Title className="block-title">{title}</Title>
                        {buttons && <div className="block-buttons">{buttons}</div>}
                    </div>
                )}
                <div className="block-content">
                    {children}
                </div>
            </div>
        );
    }
}

export default Block;
