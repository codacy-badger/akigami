import React, { PureComponent } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class User extends PureComponent {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        Страница пользователя
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default User;
