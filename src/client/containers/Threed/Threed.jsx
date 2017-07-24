import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import Responsive from 'react-responsive';

const propTypes = {
    children: PropTypes.any,
};

const defaultProps = {
    children: null,
};

class Threed extends PureComponent {
    static defaultProps = {
        ...defaultProps,
        inverse: false,
    }
    static propTypes = {
        ...propTypes,
        inverse: PropTypes.bool,
    }
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
        const { inverse } = this.props;
        const { left, right, center } = this.makeComponents();
        return (
            <Grid className="content">
                <Row>
                    <Col xs={12} sm={4} lg={3}>
                        <Responsive minWidth={1200}>
                            {left}
                        </Responsive>
                        <Responsive maxWidth={1199}>
                            {inverse ? right : left}
                            {inverse ? left : right}
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

Left.propTypes = propTypes;
Right.propTypes = propTypes;
Center.propTypes = propTypes;

Left.defaultProps = defaultProps;
Right.defaultProps = defaultProps;
Center.defaultProps = defaultProps;

Threed.Left = Left;
Threed.Right = Right;
Threed.Center = Center;

export default Threed;
