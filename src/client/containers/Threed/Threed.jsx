import React, { Children, PureComponent } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Responsive from 'react-responsive';

class Threed extends PureComponent {
    makeComponents = () => {
        const { children } = this.props;
        const obj = {};
        Children.forEach(children, (c) => {
            if (c.type.name === 'Left') obj.left = c;
            if (c.type.name === 'Right') obj.right = c;
            if (c.type.name === 'Center') obj.center = c;
        });
        return obj;
    }
    render() {
        const { left, right, center } = this.makeComponents();
        return (
            <Grid className="content">
                <Row>
                    <Col xs={12} sm={4} lg={3}>
                        {left}
                        <Responsive maxWidth={1199}>
                            {right}
                        </Responsive>
                    </Col>
                    <Col xs={12} sm={8} lg={6}>
                        {center}
                    </Col>
                    <Responsive minWidth={1200}>
                        <Col xs={12} sm={4} lg={3}>
                            {right}
                        </Col>
                    </Responsive>
                </Row>
            </Grid>
        );
    }
}

const Left = ({ children }) => <div>{children}</div>;
const Right = ({ children }) => <div>{children}</div>;
const Center = ({ children }) => <div>{children}</div>;

Threed.Left = Left;
Threed.Right = Right;
Threed.Center = Center;

export default Threed;
