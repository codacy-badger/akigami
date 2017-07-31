import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import Responsive from 'react-responsive';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import Logo from '../../components/Logo';
import Avatar from '../../components/Avatar';
import Icon from '../../components/Icon';

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
            <header className={cx({ transparent })}>
                <Grid>
                    <Row>
                        <Col xs={12} className="header-inner">
                            <a href="/" className="header-logo">
                                <Logo width={32} height={32} oneColor="#fff" twoColor="#fff" />
                            </a>
                            <div className="header-left">
                                <Responsive minWidth={460}>
                                    <FormControl
                                        type="text"
                                        className="header-search"
                                        placeholder="Поиск аниме, манги, музыки..."
                                    />
                                </Responsive>
                                <Responsive maxWidth={459}>
                                    <a href="/search" className="header-item">
                                        <Icon type="magnify" />
                                    </a>
                                </Responsive>
                            </div>
                            <div className="header-menu">
                                <a href="/overview" className="header-item header-item-module">
                                    <Icon type="view-module" />
                                    <span>Обзор</span>
                                </a>
                                <a href="/news" className="header-item">
                                    <Icon type="newspaper" />
                                    <span>Новости</span>
                                </a>
                                <a href="/radio" className="header-item">
                                    <Icon type="radio" />
                                    <span>Радио</span>
                                </a>
                            </div>
                            <div className="header-right">
                                {user.isAuth && <DropdownButton
                                    noCaret
                                    pullRight
                                    bsStyle="link"
                                    className="header-item-avatar"
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
                                    <MenuItem onClick={user.logout}>Выход</MenuItem>
                                </DropdownButton>}
                                {!user.isAuth && <a href="/signin" className="header-item">
                                    <Icon type="login" />
                                    <span>Вход</span>
                                </a>}
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </header>
        );
    }
}

export default Header;
