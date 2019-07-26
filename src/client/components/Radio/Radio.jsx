import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { RadioWrapper, RadioInput, RadioLabel } from './Radio.styles';


class Radio extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: () => {},
  }

  render() {
    const { id, name, onChange, children } = this.props;
    return (
      <RadioWrapper>
        <RadioInput id={id} type="radio" name={name} onChange={onChange} />
        <RadioLabel htmlFor={id}>{children}</RadioLabel>
      </RadioWrapper>
    );
  }
}

export default Radio;
