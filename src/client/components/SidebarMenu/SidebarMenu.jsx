import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SidebarItem from './SidebarItem';

class SidebarMenu extends PureComponent {
    static Item = SidebarItem;
    static defaultProps = {
        children: null,
    }
    static propTypes = {
        children: PropTypes.any,
    }
    render() {
        const { children } = this.props;
        return (
            <div className="sidebar-menu">
                {children}
            </div>
        );
    }
}

export default SidebarMenu;
