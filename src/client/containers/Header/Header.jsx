import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import Responsive from 'react-responsive';
import PropTypes from 'prop-types';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import Avatar from '../../components/Avatar';
import Logo from '../../components/Logo';
import {
    Head,
    Grid,
    Row,
    Inner,
    Logotype,
    Left,
    Right,
    Menu,
    Item,
    Icon,
    Title,
    Dropdown,
    Search,
} from './Header.styled';

@inject(s => ({
    ui: s.app.ui,
    user: s.app.user,
}))
@observer
class Header extends PureComponent {
    static propTypes = {
        ui: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    }
    componentDidMount() {
        this.scrollEventer();
        document.addEventListener('scroll', this.scrollEventer);
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollEventer);
    }
    scrollEventer = () => {
        console.log(document.body.scrollTop);
        const { ui } = this.props;
        const isTop = document.body.scrollTop <= 130;
        if (ui.transparented) {
            if (!ui.transparent && isTop) ui.changeTransparent(true);
            if (ui.transparent && !isTop) ui.changeTransparent(false);
        }
    }
    render() {
        const { ui, user } = this.props;
        const transparent = ui.transparented ? ui.transparent : false;
        return (
            <Head transparent={transparent}>
                <Grid>
                    <Row>
                        <Inner xs={12}>
                            <Logotype href="/">
                                <Logo width={32} height={32} oneColor="#fff" twoColor="#fff" />
                            </Logotype>
                            <Left>
                                <Responsive minWidth={460}>
                                    <Search
                                        type="text"
                                        placeholder="Поиск аниме, манги, музыки..."
                                    />
                                </Responsive>
                                <Responsive maxWidth={459}>
                                    <Item href="/search">
                                        <Icon type="magnify" />
                                    </Item>
                                </Responsive>
                            </Left>
                            <Menu>
                                <Item href="/explore">
                                    <Icon large type="view-module" />
                                    <Title>Обзор</Title>
                                </Item>
                                <Item href="/news">
                                    <Icon type="newspaper" />
                                    <Title>Новости</Title>
                                </Item>
                                <Item href="/radio">
                                    <Icon type="radio" />
                                    <Title>Радио</Title>
                                </Item>
                            </Menu>
                            <Right>
                                {user.isAuth && (
                                    <Dropdown
                                        noCaret
                                        pullRight
                                        bsStyle="link"
                                        id="user-dropdown"
                                        title={(
                                            <Avatar
                                                size={32}
                                                src={user.getAvatar}
                                            />
                                        )}
                                    >
                                        <MenuItem header>Профиль</MenuItem>
                                        <MenuItem componentClass="a" href={`/@${user.username}`}>
                                            <strong>{user.displayName}</strong>
                                        </MenuItem>
                                        <MenuItem divider />
                                        <MenuItem header>Списки</MenuItem>
                                        <MenuItem disabled>Аниме</MenuItem>
                                        <MenuItem disabled>Манга</MenuItem>
                                        <MenuItem divider />
                                        <MenuItem componentClass="a" href="/settings">
                                            Настройки
                                        </MenuItem>
                                        <MenuItem onClick={user.logout}>Выход</MenuItem>
                                    </Dropdown>
                                )}
                                {!user.isAuth && (
                                    <Item href="/signin">
                                        <Icon type="login" />
                                        <Title>Вход</Title>
                                    </Item>
                                )}
                            </Right>
                        </Inner>
                    </Row>
                </Grid>
            </Head>
        );
    }
}

export default Header;
