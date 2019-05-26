import styled from '@emotion/styled';

function makeRatio(p) {
  switch (p.ratio) {
  case '1:1': return '100%';
  case '4:3': return '75%';
  case '16:9': return '56.25%';
  case '21:9': return '42.857143%';
  default: return 'auto';
  }
}
export const Wrapper = styled('div')`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;

  &:before {
    display: block;
    content: '';
    padding-top: ${makeRatio};
  }
`;

export const Inner = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;
