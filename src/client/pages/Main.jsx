import React, { PureComponent } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Main extends PureComponent {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        Основная страница
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Main;
