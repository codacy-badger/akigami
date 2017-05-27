import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Block extends PureComponent {
    static defaultProps = {
        title: null,
        size: 'large',
        children: null,
        buttons: null,
    }
    static propTypes = {
        title: PropTypes.string,
        buttons: PropTypes.any,
        size: PropTypes.oneOf(['large', 'small']),
        children: PropTypes.any,
    }
    render() {
        const { buttons, title, size, children } = this.props;
        const Title = size === 'large' ? 'h3' : 'h4';
        return (
            <div className={cx({ block: true, [size]: size })}>
                {title && (
                    <div className="block-header">
                        <Title>{title}</Title>
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
