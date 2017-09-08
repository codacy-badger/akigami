import styled from 'emotion/react';

export default styled('div')`
    padding-top: ${p => (p.opaque ? '48px' : '0')};

    > div:first-child {
        padding-top: ${p => (p.transparented ? '48px' : 'initial')};
    }
`;
