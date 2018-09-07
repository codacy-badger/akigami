import styled from 'react-emotion';


export const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  margin-top: -64px;

  @media screen and (max-width: 599px) {
    margin-top: -56px;
  }
`;

export const Background = styled('div')`
  background-image: url(${p => p.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-x: -100px;
  opacity: 0.85;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Blur = styled('div')`
  overflow: hidden;
  position: absolute;
  width: 480px;
  height: 100%;
  display: flex;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
  &:before {
    content: "";
    position: absolute;
    top: -100px;
    left: -100px;
    bottom: -100px;
    right: -100px;
    box-shadow: inset 0 0 0 100vh rgba(255, 255, 255, 0.8);
    background-image: url(${p => p.src});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position-x: -100px;
    overflow: hidden;
    filter: blur(10px);
  }
`;

export const Panel = styled('div')`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 24px 32px;
`;


export const Header = styled('h2')`
  font-family: ${p => p.theme.fontFamily};
  color: ${p => p.theme.colors.textDark};
`;
