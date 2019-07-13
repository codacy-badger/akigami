import React from 'react';
import PropTypes from 'prop-types';
import { withState, withStateful } from './modifiers';

import { StyledButton, Icon } from './Button.styles';

const Button = ({
  as,
  view,
  children,
  block,
  size,
  disabled,
  iconLeft,
  iconRight,
  icon,
  transparent,
  collapsible,
  collapsed,
  ...props
}) => {
  const styleProps = {
    size,
    view: disabled ? 'disable' : view,
    disabled,
  };
  let Component = StyledButton;
  if (as) Component = StyledButton.withComponent(as);
  return (
    <Component
      {...props}
      {...styleProps}
      transparent={transparent}
      collapsible={collapsible}
      collapsed={collapsed}
      block={block}
      isIconLeft={!!iconLeft}
      isIconRight={!!iconRight}
      isIconSingle={icon && !children}
    >
      {(icon && !children) && <Icon {...styleProps} place="single">{icon}</Icon>}
      {iconLeft && <Icon {...styleProps} place="left">{iconLeft}</Icon>}
      {children && <span>{children}</span>}
      {iconRight && <Icon {...styleProps} place="right">{iconRight}</Icon>}
    </Component>
  );
};


Button.propTypes = {
  size: PropTypes.oneOf(['extraSmall', 'default', 'small', 'large']),
  view: PropTypes.oneOf(['default', 'success', 'warning', 'danger', 'info', 'primary', 'borderless', 'disable', 'shadow']),
  children: PropTypes.any,
  disabled: PropTypes.bool,
  transparent: PropTypes.bool,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  block: PropTypes.bool,
  icon: PropTypes.any,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
  as: PropTypes.any,
};

Button.defaultProps = {
  size: 'default',
  view: 'default',
  children: null,
  disabled: false,
  transparent: false,
  collapsible: false,
  collapsed: false,
  block: false,
  icon: null,
  iconLeft: null,
  iconRight: null,
  as: null,
};

export const StateButton = withState(Button);
export const StatefulButton = withStateful(withState(Button));
export default Button;
