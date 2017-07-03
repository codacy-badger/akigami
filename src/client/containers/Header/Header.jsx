import React, { PureComponent } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';

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
                                <FormControl
                                    type="text"
                                    className="header-search"
                                    placeholder="Поиск аниме, манги, музыки..."
                                />
                            </div>
                            <div className="header-menu">
                                <a href="/overview" className="header-item">
                                    <Icon type="view-module" />
                                    Обзор
                                </a>
                                <a href="/news" className="header-item">
                                    <Icon type="newspaper" />
                                    Новости
                                </a>
                                <a href="/radio" className="header-item">
                                    <Icon type="radio" />
                                    Радио
                                </a>
                            </div>
                            <div className="header-right">
                                <a href="/?m=login" className="header-item">
                                    <Icon type="login" />
                                    Вход
                                </a>
                                {/* <Avatar
                                    size={32}
                                    src="https://pp.userapi.com/c628529/v628529041/24c85/zRkseeHfRPs.jpg"
                                /> */}
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </header>
        );
    }
}

export default Header;
