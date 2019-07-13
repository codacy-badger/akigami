import React from 'react';
import PropTypes from 'prop-types';
import Content from './PageContent.styles';

const PageContent = ({ children, ...props }) => (
  <Content {...props}>
    {children}
  </Content>
);

PageContent.propTypes = {
  children: PropTypes.any.isRequired,
};

export default PageContent;
