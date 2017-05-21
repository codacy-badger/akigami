import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';

class SidebarUser extends PureComponent {
    static propTypes = {
        user: PropTypes.object.isRequired,
    }
    render() {
        const { user } = this.props;
        return (
            <div className="sidebar-user">
                <Avatar src={user.avatar} size={40} href={user.link} />
                <div className="inner">
                    <a href={user.link}>{user.username}</a>
                    <small>Мой аккаунт</small>
                </div>
                <a href="/settings"></a>
            </div>
        );
    }
}

export default SidebarUser;
