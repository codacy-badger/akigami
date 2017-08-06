import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Settings extends PureComponent {
    render() {
        return (
            <div className="opaque">
                <Grid className="content">
                    <Row>
                        <Col xs={12}>
                            123
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Settings;
