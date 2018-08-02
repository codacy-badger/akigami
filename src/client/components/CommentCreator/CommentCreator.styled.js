import styled from 'react-emotion';
import Text from 'react-textarea-autosize';
import { Button } from 'react-bootstrap';
import Ava from '../Avatar';
import Ico from '../Icon';

export const Creator = styled('div')`
  position: relative;
  width: 100%;
  padding: 12px;

  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background-color: #fefefe;
`;

export const Short = styled('div')`
  display: flex;
  width: 100%;
`;

export const Textarea = styled(Text)`
  width: 100%;
  border: none;
  resize: none;
  padding: 0;
  margin-top: 5px;
  background: transparent;
  cursor: text;
`;

export const Full = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Avatar = styled(Ava)`
  flex-shrink: 0;
  margin-right: 12px;
`;

export const Header = styled('div')`
  display: flex;
  width: 100%;
`;

export const Attachments = styled('div')`
  display: flex;
  width: 100%;
  margin-right: 12px;

  @media screen and (max-width: 767px) {
    margin-right: 0;
  }
`;

export const Footer = styled('div')`
  display: flex;
  width: 100%;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

export const Action = styled(Button)`
  margin-left: auto;
`;

export const Replied = styled('div')`
  margin-left: auto;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #999;
`;

export const Clear = styled(Button)`
  font-size: 16px;
  margin-top: 0;
  text-decoration: none !important;
`;

export const Attach = styled(Button)`
  font-size: 24px;
  padding: 0;
  margin: -4px 0;
  text-decoration: none !important;
`;

export const Icon = styled(Ico)`
  display: flex;
`;
