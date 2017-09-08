import React, { PureComponent } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Wrapper from '../../components/Wrapper';

class Error extends PureComponent {
    render() {
        return (
            <Wrapper opaque>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            Страница ошибки
                        </Col>
                    </Row>
                </Grid>
            </Wrapper>
        );
    }
}

export default Error;
