import { css } from '@emotion/core';
import slick from './external/slick';

export default css`
  * {
    -webkit-tap-highlight-color: transparent;
  }

  h1 {
    font-size: 42px;
    font-weight: bold;
    letter-spacing: -1.2px;
    line-height: 54px;
    margin-bottom: 24px;
    position: relative;
  }

  .scroll-lock {
    overflow: hidden;
    position: fixed;
    width: 100%;
  }

  b {
    font-weight: bold;
  }

  p {
    line-height: initial;
  }
  ${slick}
`;
