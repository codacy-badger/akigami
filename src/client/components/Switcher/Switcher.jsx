import React, { PureComponent } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Wrapper, Switch } from './Switcher.styled';

class Switcher extends PureComponent {
  static propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    inline: PropTypes.bool,
    bsSize: PropTypes.string,
  };
  static defaultProps = {
    value: null,
    onChange: null,
    inline: false,
    bsSize: null,
  };
  constructor(props) {
    super(props);
    let defaultValue = props.value;
    if (!props.value && props.options.length > 0) {
      const [{ value }] = props.options;
      defaultValue = value;
    }
    this.state = {
      value: defaultValue,
    };
  }
  handleClick = value => {
    const { value: selected } = this.state;
    if (selected === value) return;
    this.setState({ value }, this.callback);
  };
  callback = () => {
    const { value } = this.state;
    const { onChange } = this.props;
    onChange?.(value);
  };
  render() {
    const { value: selected } = this.state;
    const { options, inline, bsSize } = this.props;
    return (
      <Wrapper inline={inline}>
        <ButtonGroup>
          {options.map(({ value, title, ...otherProps }) => (
            <Switch
              key={value}
              bsSize={bsSize}
              onClick={() => this.handleClick(value)}
              bsStyle={selected === value ? 'danger' : 'default'}
              {...otherProps}
            >
              {title}
            </Switch>
          ))}
        </ButtonGroup>
      </Wrapper>
    );
  }
}

export default Switcher;
