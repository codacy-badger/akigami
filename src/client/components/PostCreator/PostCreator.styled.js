import styled from 'react-emotion';
import { Button } from 'react-bootstrap';
import Text from 'react-textarea-autosize';
import Ava from '../Avatar';

export const Post = styled('section')`
  position: relative;
  padding: 12px;
  margin-bottom: 12px;
  transition: box-shadow 0.2s ease;
  will-change: box-shadow;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06), 0 7px 5px -5px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  background-color: white;
`;

export const Short = styled('div')`
  display: flex;
  width: 100%;
  cursor: text;
`;

export const Textarea = styled(Text)`
  width: 100%;
  border: none;
  resize: none;
  padding: 0;
  margin-top: 5px;
`;

export const Attachments = styled('div')`
  display: flex;
  width: 100%;
  margin-right: 12px;

  @media screen and (max-width: 767px) {
    margin-right: 0;
  }
`;

export const Attach = styled(Button)`
  padding: 0 8px;
  font-size: 23px;
  margin: -4px;
  color: #d54343;
`;

export const Avatar = styled(Ava)`
  margin-right: 12px;
  flex-shrink: 0;
`;

export const Full = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled('div')`
  display: flex;
  width: 100%;
`;

export const Footer = styled('div')`
  display: flex;
  width: 100%;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #ddd;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const Action = styled(Button)`
  margin-left: auto;

  @media screen and (max-width: 767px) {
    width: 100%;
    margin-top: 6px;
  }
`;
