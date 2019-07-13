import styled from '@emotion/styled';

export const Wrapper = styled('div')`
  position: relative;
  height: 280px;
  margin-left: -5px;
  overflow: hidden;
`;

const shouldForwardProp = (prop) => !['src'].includes(prop);
export const Background = styled('div', { shouldForwardProp })`
  width: 100%;
  height: 100%;
  background-image: ${p => `url(${p.src})`};
  background-color: ${p => p.theme.colors.gray};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(1px);
`;

export const Foreground = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: ${p => p.theme.colors.white};
  background: ${p => `linear-gradient(to bottom, ${p.theme.mixins.withOpacity('#000000', 0.4)} 0%, ${p.theme.mixins.withOpacity(p.theme.colors.gray, 0.3)} 100%);`};
  padding-top: 65px;
  box-sizing: border-box;
  display: flex;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

export const Content = styled('div')`
  display: flex;
  align-items: center;
`;

export const Title = styled('h3')`
  font-size: 32px;
  font-weight: 600;
`;

export const Info = styled('div')`
  width: 100%;
  padding-left: 24px;
`;

export const FlexInfo = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 8px;

  @media screen and (max-width: 560px) {
    > div:last-child {
      display: none;
    }
  }
`;

export const ImageWrapper = styled('div')`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
`;
