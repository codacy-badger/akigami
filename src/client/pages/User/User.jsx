import React, { PureComponent } from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import BackgroundCover from '../../components/BackgroundCover';

class User extends PureComponent {
    render() {
        return (
            <section>
                <BackgroundCover src="https://pp.userapi.com/c836428/v836428041/3cf47/wqErtk-oGdY.jpg" />
                <Container className="with-top">
                    <Row>
                        <Col xs="12">
                            Мемы
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

export default User;
