import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Avatar extends PureComponent {
    static defaultProps = {
        src: null,
        size: 40,
        href: null,
        online: null,
        onClick: null,
    }
    static propTypes = {
        src: PropTypes.string,
        size: PropTypes.number,
        href: PropTypes.string,
        online: PropTypes.bool,
        onClick: PropTypes.func,
    }
    render() {
        const { src, href, onClick, size, online } = this.props;
        const props = {};
        let Tag = 'div';
        if (href) {
            Tag = 'a';
            props.href = href;
        }
        if (onClick) {
            Tag = 'button';
            props.onClick = onClick;
        }
        const onlineTarget = typeof online === 'object';
        return (
            <Tag
                {...props}
                className={cx({
                    avatar: true,
                    offline: !onlineTarget && !online,
                    online: !onlineTarget && online,
                })}
                style={{
                    backgroundImage: `url(${src})`,
                    width: size,
                    height: size,
                }}
            />
        );
    }
}

export default Avatar;
