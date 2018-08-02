import styled from 'react-emotion';

export const Cover = styled('a')`
  display: block;
  position: relative;
  width: 100%;
  height: 40%;
  height: 0;
  padding-bottom: 50%;
  border-radius: 2px;

  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;

  &:before {
    content: '';
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 2px;

    transition: background-color 0.2s ease;
  }

  &:hover {
    &:before {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
`;

export const Title = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  color: #fff;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;
