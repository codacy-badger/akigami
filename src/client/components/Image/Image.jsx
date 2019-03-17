// @jsx jsx
import React, { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { withTheme } from 'emotion-theming';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import ImageFallback from 'react-image-fallback';

@withTheme
class Image extends Component {
  static fallbackImage = '/images/no-avatar.jpg';

  static propTypes = {
    theme: PropTypes.object.isRequired,
    fallback: PropTypes.string,
    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    shape: PropTypes.oneOf(['square', 'rounded', 'circle']),
    fit: PropTypes.oneOf(['initial', 'inherit', 'cover', 'contain', 'fill', 'none']),
  }

  static defaultProps = {
    fallback: null,
    size: null,
    width: null,
    height: null,
    shape: 'rounded',
    fit: 'initial',
  }

  render() {
    let { width, height } = this.props;
    const { theme, shape, fallback, size, fit, ...props } = this.props;
    const fallbackImage = fallback || this.constructor.fallbackImage;
    let borderRadius = 0;
    if (shape === 'circle') borderRadius = theme.borderRadiusCircle;
    if (shape === 'rounded') ({ borderRadius } = theme);
    if (size) {
      width = size;
      height = size;
    }
    return (
      <ImageFallback
        fallbackImage={fallbackImage}
        initialImage={fallbackImage}
        {...omit(props, ['width', 'height'])}
        css={css`
          ${width && `width: ${width}px;`}
          ${height && `height: ${height}px;`}
          border-radius: ${borderRadius};
          object-fit: ${fit};
          user-select: none;
          pointer-events: none;
        `}
      />
    );
  }
}

export default Image;
