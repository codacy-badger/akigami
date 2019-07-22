import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Title, Actions } from './BlockTitle.styles';

const BlockTitle = props => {
  const { children, actions } = props;
  return (
    <Wrapper>
      <Title>
        {children}
      </Title>
      {actions && (
        <Actions>
          {actions}
        </Actions>
      )}
    </Wrapper>
  );
};

BlockTitle.propTypes = {
  children: PropTypes.any.isRequired,
  actions: PropTypes.any,
};

BlockTitle.defaultProps = {
  actions: null,
};

export default BlockTitle;
