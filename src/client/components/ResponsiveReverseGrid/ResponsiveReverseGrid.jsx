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
    reverse: PropTypes.bool,
  }

  static defaultProps = {
    reverse: false,
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
    if (w >= 1490 && mobile) {
      this.setState({ mobile: false });
    }
    if (w < 1490 && !mobile) {
      this.setState({ mobile: true });
    }
  }

  renderLeft() {
    const { mobile } = this.state;
    const { left, right, reverse } = this.props;
    if (reverse && !mobile) {
      return (
        <Col width={sideSizes}>
          {left}
        </Col>
      );
    }
    if (!reverse && mobile) {
      return (
        <Col width={sideSizes}>
          {left}
          {right}
        </Col>
      );
    }
    return false;
  }

  renderRight() {
    const { mobile } = this.state;
    const { left, right, reverse } = this.props;
    if (!mobile) {
      return (
        <Col width={sideSizes}>
          {left}
        </Col>
      );
    }
    if (reverse && mobile) {
      return (
        <Col width={sideSizes}>
          {left}
          {right}
        </Col>
      );
    }
    return false;
  }

  render() {
    const { center } = this.props;
    return (
      <Row>
        {this.renderLeft()}
        <Col width={mainSizes}>
          {center}
        </Col>
        {this.renderRight()}
      </Row>
    );
  }
}

export default ResponsiveReverseGrid;
