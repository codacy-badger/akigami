import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Logo extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    oneColor: PropTypes.string,
    twoColor: PropTypes.string,
  };

  static defaultProps = {
    width: 100,
    height: 100,
    oneColor: '#d54343',
    twoColor: '#fff',
  };

  render() {
    const { width, height, oneColor, twoColor, ...props } = this.props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        version="1.1"
        viewBox="0 0 238.51737 281.03214"
        aria-labelledby="title"
        {...props}
      >
        <title id="title">Акигами</title>
        <g
          fillRule="evenodd"
          strokeWidth="1px"
          transform="translate(-166.53 -160.41)"
        >
          <path
            fill={oneColor}
            d="m254.05 225.43-39.775 14.142-47.098 108.72 116.42 58.589 42.931-16.162-117.18-56.063z"
            stroke={oneColor}
          />
          <path
            fill={twoColor}
            d="m246.48 161.16 39.143-0.25254 118.67 280.03h-39.554z"
            stroke={twoColor}
          />
        </g>
      </svg>
    );
  }
}
