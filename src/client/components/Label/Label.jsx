import React from 'react';
import PropTypes from 'prop-types';
import Content from './Label.styles';

const Label = ({ type, children, ...props }) => (
  <Content type={type} {...props}>
    {children}
  </Content>
);

Label.propTypes = {
  type: PropTypes.oneOf(['solid', 'border']),
  children: PropTypes.any.isRequired,
};

Label.defaultProps = {
  type: 'solid',
};

export default Label;
