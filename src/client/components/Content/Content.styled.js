import styled from 'react-emotion';
import Grid from 'react-bootstrap/lib/Grid';

export default styled(Grid)`
    padding-top: 32px;

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
