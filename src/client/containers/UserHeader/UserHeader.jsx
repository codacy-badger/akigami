import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Menu } from 'semantic-ui-react';

import Avatar from '../../components/Avatar';

class UserHeader extends PureComponent {
    static propTypes = {
        user: PropTypes.object.isRequired,
    }
    state = {
        tab: 'about',
    }
    handleChangeTab = (e, { value }) => {
        this.setState({ tab: value });
    }
    render() {
        const { user } = this.props;
        const { tab } = this.state;
        return (
            <Grid container style={{ marginTop: 100, marginBottom: 30 }}>
                <Grid.Column className="profile-grid">
                    <div className="profile-avatar">
                        <Avatar size="auto" src={user.avatar} online={user.online} />
                    </div>
                    <div className="profile-info">
                        <h1>{user.displayName}</h1>
                        <p>{user.status}</p>
                        <Menu secondary>
                            <Menu.Item
                                name="о себе"
                                value="about"
                                active={tab === 'about'}
                                onClick={this.handleChangeTab}
                            />
                            <Menu.Item
                                name="библиотека"
                                value="library"
                                active={tab === 'library'}
                                onClick={this.handleChangeTab}
                            />
                            <Menu.Item
                                name="рецензии"
                                value="review"
                                active={tab === 'review'}
                                onClick={this.handleChangeTab}
                            />
                            <Menu.Item
                                name="подписчики"
                                value="followers"
                                active={tab === 'followers'}
                                onClick={this.handleChangeTab}
                            />
                            <Menu.Item
                                name="клубы"
                                value="clubs"
                                active={tab === 'clubs'}
                                onClick={this.handleChangeTab}
                            />
                            <Menu.Menu position="right">
                                <Menu.Item
                                    name="Подписаться"
                                    onClick={() => alert('subscribed')}
                                />
                            </Menu.Menu>
                        </Menu>
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}

export default UserHeader;
