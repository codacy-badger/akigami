import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class LogoMini extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    oneColor: PropTypes.string,
    twoColor: PropTypes.string,
  };

  static defaultProps = {
    width: 173,
    height: 208,
    oneColor: '#d54343',
    twoColor: '#2f333a',
  };

  render() {
    const { width, height, oneColor, twoColor, ...props } = this.props;
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 173 208" {...props}>
        <g fillRule="evenodd">
          <path fill={oneColor} d="M64 48L35 58 0 139l86 43 32-11-87-42z" />
          <path fill={twoColor} d="M173 208h-26L59 0h26zM31 129" />
        </g>
      </svg>
    );
  }
}

export default LogoMini;
