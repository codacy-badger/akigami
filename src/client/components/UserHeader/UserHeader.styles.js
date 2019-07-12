import styled from '@emotion/styled';

export const Wrapper = styled('div')`
  position: relative;
  height: 280px;
  margin-left: -5px;
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
    align-items: flex-end;
  }
`;
