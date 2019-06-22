import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../Grid';

const sideSizes = ['35%', '30%', '30%', '25%'];
const mainSizes = ['65%', '70%', '70%', '50%'];

class ResponsiveReverseGrid extends Component {
  static propTypes = {
    left: PropTypes.any.isRequired,
    right: PropTypes.any.isRequired,
    center: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
    };
    this.listener = this.listener.bind(this);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.listener);
      this.listener();
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.listener);
    }
  }

  listener() {
    const { mobile } = this.state;
    const w = window.innerWidth;
    if (w >= 1280 && mobile) {
      this.setState({ mobile: false });
    }
    if (w < 1280 && !mobile) {
      this.setState({ mobile: true });
    }
  }

  render() {
    const { mobile } = this.state;
    const { left, right, center } = this.props;
    return (
      <Row>
        <Col width={sideSizes}>
          {left}
          {mobile && right}
        </Col>
        <Col width={mainSizes}>
          {center}
        </Col>
        {!mobile && (
          <Col width={sideSizes}>
            {right}
          </Col>
        )}
      </Row>
    );
  }
}

export default ResponsiveReverseGrid;
