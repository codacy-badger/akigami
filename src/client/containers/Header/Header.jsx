import React, { PureComponent } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Logo from '../../components/Logo';
import Avatar from '../../components/Avatar';

class Header extends PureComponent {
    render() {
        return (
            <header>
                <Grid>
                    <Row>
                        <Col xs={12} className="header-inner">
                            <a href="/" className="header-logo">
                                <Logo width={42} height={42} oneColor="#fff" twoColor="#fff" />
                            </a>
                            <div className="header-right">
                                <a href="/?m=login" className="header-item">Вход / Регистрация</a>
                                {/* <Avatar
                                    size={42}
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
