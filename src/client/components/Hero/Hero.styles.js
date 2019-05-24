import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const Background = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${p => `url(${p.src}) no-repeat center center / cover`};
`;

export const Foreground = styled('div')`
  padding: 16px 18px;
  color: ${p => p.theme.colors.white};
  position: relative;
  box-sizing: border-box;
  height: 180px;
`;

export const globalSlick = css`
  .akg-hero {
    margin: 0 -20%;
  }
  .akg-hero .slick-slide.slick-center {
    opacity: 1;
  }
  .akg-hero .slick-slide {
    opacity: .3;
  }
  @media (max-width: 768px) {
    .akg-hero {
      margin: 0;
    }
    .akg-hero .slick-slide {
      opacity: 1 !important;
    }
  }
`;

export const Wrapper = styled('div')`
  width: 100%;
  overflow: hidden;
`;
