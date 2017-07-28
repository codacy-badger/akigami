import React, { PureComponent } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Error extends PureComponent {
    render() {
        return (
            <Grid className="opaque">
                <Row>
                    <Col xs={12}>
                        Страница ошибки
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Error;
