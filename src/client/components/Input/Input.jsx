import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import StyledInput from './Input.styles';

class Input extends PureComponent {
  static propTypes = {
    as: PropTypes.any,
    block: PropTypes.bool,
  }

  static defaultProps = {
    as: null,
    block: false,
  }

  render() {
    const { as, block, ...props } = this.props;
    let Component = StyledInput;
    if (as) Component = StyledInput.withComponent(as);
    return (
      <Component block={block} {...props} />
    );
  }
}

export default Input;
