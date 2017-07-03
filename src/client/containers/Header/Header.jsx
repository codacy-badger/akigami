import React, { PureComponent } from 'react';
import Responsive from 'react-responsive';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import Logo from '../../components/Logo';
import Avatar from '../../components/Avatar';
import Icon from '../../components/Icon';

class Header extends PureComponent {
    render() {
        return (
            <header>
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
                                {/* <DropdownButton
                                    noCaret
                                    pullRight
                                    bsStyle="link"
                                    className="header-item-avatar"
                                    id="user-dropdown"
                                    title={(
                                        <Avatar
                                            size={32}
                                            src="https://pp.userapi.com/c628529/v628529041/24c85/zRkseeHfRPs.jpg"
                                        />
                                    )}
                                >
                                    <MenuItem header>Профиль</MenuItem>
                                    <MenuItem componentClass="a" href="/@ga2mer">
                                        <strong>ga2mer</strong>
                                    </MenuItem>
                                    <MenuItem divider />
                                    <MenuItem header>Списки</MenuItem>
                                    <MenuItem disabled>Аниме</MenuItem>
                                    <MenuItem disabled>Манга</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem componentClass="a" href="/logout">Выход</MenuItem>
                                </DropdownButton> */}
                                <a href="/?m=login" className="header-item">
                                    <Icon type="login" />
                                    <span>Вход</span>
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </header>
        );
    }
}

export default Header;
