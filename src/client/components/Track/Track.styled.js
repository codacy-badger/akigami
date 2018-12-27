import { css } from 'emotion';
import styled from '@emotion/styled'

const overlay = css`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 5px 10px;
  border: none;
  outline: none;
  background-color: rgba(213, 67, 67, 0.8);
  color: white;
  font-size: 24px;
  transition: opacity 0.2s ease, background-color 0.2s ease;
  will-change: opacity, background-color;
  cursor: pointer;
  opacity: 0;
  border-radius: 3px;
  &:active {
    background-color: rgba(171, 50, 50, 0.9);
  }
`;

export const Overlay = styled('button')`
  ${overlay};
`;

export const Item = styled('article')`
  display: flex;
  width: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    .${overlay} {
      opacity: 1;
    }
  }
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

export const Wrapper = styled('div')`
  position: relative;
  width: 45px;
  height: 45px;
  flex-shrink: 0;
  margin-right: 12px;
  overflow: hidden;
  display: flex;
`;

export const Cover = styled('img')`
  width: 100%;
  border-radius: 3px;
`;

export const Info = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

export const Artist = styled('a')`
  font-size: 12px;
  color: #666;
  max-width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-shrink: 0;
`;

export const Title = styled('span')`
  font-size: 12px;
  font-weight: bold;
  max-width: 55%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:before {
    content: '—';
    font-weight: 400;
    margin: 0 4px;
  }
`;

export const Line = styled('div')`
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
  overflow: hidden;
`;

export const Anime = styled('a')`
  font-size: 13px;
  color: #666;
`;

export const Type = styled('span')`
  font-size: 13px;
  font-weight: 500;
  &:before {
    content: '—';
    font-weight: 400;
    margin: 0 4px;
  }
`;
