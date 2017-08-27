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
        className: null,
    }
    static propTypes = {
        src: PropTypes.string,
        size: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
        href: PropTypes.string,
        online: PropTypes.bool,
        onClick: PropTypes.func,
        className: PropTypes.string,
    }

    render() {
        const { src, href, onClick, size, online, className } = this.props;
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
        const style = {
            backgroundImage: `url(${src})`,
            width: size,
            height: size,
        };
        if (size === 'auto') {
            style.width = '100%';
            style.height = 0;
            style.paddingBottom = '100%';
        }
        return (
            <Tag
                {...props}
                className={cx({
                    avatar: true,
                    offline: !onlineTarget && !online,
                    online: !onlineTarget && online,
                    [className]: className,
                })}
                style={style}
            />
        );
    }
}

export default Avatar;
