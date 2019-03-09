import React from 'react';
import PropTypes from 'prop-types';
import { withState, withStateful } from './modifiers';

import { StyledButton, Icon } from './Button.styles';

const Button = ({
  view,
  children,
  block,
  size,
  disabled,
  iconLeft,
  iconRight,
  icon,
  transparent,
  ...props
}) => {
  const styleProps = {
    size,
    view: disabled ? 'disable' : view,
    disabled,
  };
  return (
    <StyledButton
      {...props}
      {...styleProps}
      transparent={transparent}
      block={block}
      isIconLeft={!!iconLeft}
      isIconRight={!!iconRight}
      isIconSingle={icon && !children}
    >
      {(icon && !children) && <Icon {...styleProps} place="single">{icon}</Icon>}
      {iconLeft && <Icon {...styleProps} place="left">{iconLeft}</Icon>}
      {children}
      {iconRight && <Icon {...styleProps} place="right">{iconRight}</Icon>}
    </StyledButton>
  );
};


Button.propTypes = {
  size: PropTypes.oneOf(['default', 'small', 'large']),
  view: PropTypes.oneOf(['default', 'success', 'warning', 'danger', 'info', 'primary', 'borderless', 'disable']),
  children: PropTypes.any,
  disabled: PropTypes.bool,
  transparent: PropTypes.bool,
  block: PropTypes.bool,
  icon: PropTypes.any,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
};

Button.defaultProps = {
  size: 'default',
  view: 'default',
  children: null,
  disabled: false,
  transparent: false,
  block: false,
  icon: null,
  iconLeft: null,
  iconRight: null,
};

export const StateButton = withState(Button);
export const StatefulButton = withStateful(withState(Button));
export default Button;
