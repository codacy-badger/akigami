import React, { PureComponent } from 'react';
import Responsive from 'react-responsive';

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
                                <a href="/overview" className="header-item">
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
                                <a href="/?m=login" className="header-item">
                                    <Icon type="login" />
                                    <span>Вход</span>
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
