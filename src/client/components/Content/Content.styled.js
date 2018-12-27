import styled from '@emotion/styled'
import Grid from 'react-bootstrap/lib/Grid';

export default styled(Grid)`
  padding-top: 32px !important;

  display: flex;
  flex-direction: column;
  flex: 1;

  > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
    :before {
      content: none;
    }
  }
`;
