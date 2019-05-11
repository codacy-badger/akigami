import styled from '@emotion/styled';
import { Textfit } from 'react-textfit';

export const Wrapper = styled('div')`
  height: 280px;
  width: 100%;
  overflow: hidden;
  border-radius: ${p => p.theme.borderRadius};
  @media (min-width: 768px) {
    height: 380px;
  }
`;

export const Item = styled('div')`
  overflow: hidden;
  height: 100%;
`;

export const Image = styled('img')`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  user-select: none;
  pointer-events: none;
`;

export const Title = styled(Textfit)`
  font-size: 47px;
  font-weight: bold;
  line-height: normal;
  color: #fff;
  height: 120px;
  display: block;
  overflow: hidden;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    height: 138px;
  }
`;


export const Foreground = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: ${p => p.theme.borderRadius};
  overflow: hidden;
  box-sizing: border-box;
  padding: 24px;
  background: radial-gradient(
    ellipse at left top,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0) 65%
  );
`;
