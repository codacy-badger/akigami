import { css } from 'emotion';
import styled from '@emotion/styled'
import Text from 'react-textarea-autosize';
import { Button } from 'react-bootstrap';
import Ava from '../Avatar';

const actions = css`
  margin-left: auto;
  opacity: 0;
  transition: opacity 0.2s ease;
  will-change: opacity;
`;

export const Actions = styled('div')`
  ${actions};
`;

const replied = css`
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06) !important;
  margin-bottom: 12px !important;

  &:last-child {
    border-bottom: none !important;
    margin-bottom: 0 !important;
  }
`;

const replies = css`
  &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background: rgba(0, 0, 0, 0.06);
    left: 2.6rem;
  }
`;

const none = css`
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 12px;
`;

export const Wrapper = styled('article')`
  ${p => (p.replied ? replied : none)} ${p => p.replies && replies};

  display: flex;
  flex-direction: column;
  position: relative;

  padding-left: 12px;
  padding-right: 12px;

  overflow: hidden;

  &:first-child {
    padding-top: 12px;
  }

  &:nth-last-child(2),
  &:nth-last-child(1) {
    border-bottom: none;
    margin-bottom: 0;
  }

  &:hover {
    .${actions} {
      opacity: 1;
    }
  }
`;

export const Main = styled('div')`
  display: flex;
`;

export const Info = styled('div')`
  position: relative;
  width: 100%;
`;

const noneAvatar = css`
  box-shadow: 0 0 0 4px #fafafa;
`;

const repliedAvatar = css`
  background-color: #fafafa;
`;

export const Avatar = styled(Ava)`
  ${p => (p.replied ? repliedAvatar : noneAvatar)};
  z-index: 2;
  margin-right: 12px;
  flex-shrink: 0;
`;

export const Replies = styled('div')`
  background-color: #fbfbfb;
  margin-left: 30px;
  margin-top: 6px;
`;

export const Body = styled('div')`
  position: relative;
`;

export const User = styled('a')`
  color: #d54343;
  font-size: 13px;
  font-weight: 600;
  margin-right: 6px;
  transition: color 0.2s ease;
  will-change: color;

  &:hover {
    color: #c33e3e;
  }
`;

export const Content = styled('span')`
  white-space: pre-line;
  font-size: 13px;
`;

export const Textarea = styled(Text)`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.06);
  resize: none;
  padding: 8px 12px;
`;

export const Meta = styled('div')`
  display: flex;
  align-items: baseline;
  font-size: 10px;
  margin-top: 4px;
  font-size: 75%;
`;

export const Reply = styled(Button)`
  padding: 2px 0;
  line-height: 10px;
  font-size: 100%;
  color: #424242;
  transition: color 0.2s ease;
  will-change: color;
  text-decoration: none;

  &:hover {
    color: #d54343;
    text-decoration: none;
  }

  &:active {
    color: #c33e3e;
    text-decoration: none;
  }
`;

export const Date = styled('span')`
  color: #999;
  margin: 0 6px;
`;

export const Action = styled(Button)`
  color: #9b9b9b;
  padding: 0;
`;
