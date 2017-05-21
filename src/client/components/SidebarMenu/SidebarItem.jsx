import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class SidebarItem extends PureComponent {
    static defaultProps = {
        active: false,
    }
    static propTypes = {
        active: PropTypes.bool,
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
    }
    render() {
        const { title, href, active } = this.props;
        const props = {};
        let Tag = 'div';
        if (!active) {
            Tag = 'a';
            props.href = href;
        }
        return (
            <Tag className={cx({ active })} {...props}>{title}</Tag>
        );
    }
}

export default SidebarItem;
