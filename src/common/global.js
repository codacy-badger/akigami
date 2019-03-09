import { css } from '@emotion/core';

export default css`
  @import "fonts/stylesheet.css";
  @import "external/reset.css";

  * {
    -webkit-tap-highlight-color: transparent;
  }

  .scroll-lock {
    overflow: hidden;
    position: fixed;
    width: 100%;
  }
`;
