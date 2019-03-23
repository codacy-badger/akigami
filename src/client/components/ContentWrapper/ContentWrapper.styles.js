import styled from '@emotion/styled';

const ContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: ${p => (p.isTransparented ? '68px' : 0)};
`;

export default ContentWrapper;
