import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject('app')
@observer
export default class TopBar extends Component {
  static propTypes = {
    height: PropTypes.number,
    speed: PropTypes.number,
    style: PropTypes.object,
    app: PropTypes.object.isRequired,
  };
  static defaultProps = {
    height: 54,
    speed: 0.4,
    style: {},
  };
  render() {
    const { progress, show, color } = this.props.app.topBar;
    let progressStyle = {
      willChange: 'width',
      display: 'inline-block',
      position: 'absolute',
      top: 0,
      left: 0,
      width: `${progress}%`,
      maxWidth: '100% !important',
      height: `${this.props.height}px`,
      WebkitTransition: `${this.props.speed}s width ease-in-out, ${
        this.props.speed
      }s background-color ease-in-out`,
      transition: `${this.props.speed}s width ease-in-out, ${
        this.props.speed
      }s background-color ease-in-out`,
      zIndex: 0,
    };
    progressStyle = Object.assign({}, progressStyle, this.props.style);

    if (color && color !== 'rainbow') {
      progressStyle.backgroundColor = color;
    } else {
      progressStyle.backgroundImage =
        'linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #FF2D55)';
      progressStyle.backgroundSize = `100vw ${this.props.height}px`;
    }
    if (!show) {
      return false;
    }
    return <div className="progress" style={progressStyle} />;
  }
}
