import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header, Title, Buttons, Content } from './Block.styled';

class Block extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    buttons: PropTypes.any,
    flex: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string,
    bordered: PropTypes.bool,
    shadow: PropTypes.bool,
    padded: PropTypes.bool,
    colored: PropTypes.bool,
  };
  static defaultProps = {
    title: null,
    children: null,
    buttons: null,
    className: null,
    flex: false,
    bordered: false,
    shadow: false,
    padded: false,
    colored: false,
  };
  render() {
    const {
      buttons,
      title,
      children,
      flex,
      className,
      bordered,
      padded,
      shadow,
      colored,
    } = this.props;
    return (
      <Wrapper
        bordered={bordered}
        colored={colored}
        padded={padded}
        shadow={shadow}
        className={className}
      >
        {title && (
          <Header>
            <Title>{title}</Title>
            {buttons && <Buttons>{buttons}</Buttons>}
          </Header>
        )}
        <Content flex={flex}>{children}</Content>
      </Wrapper>
    );
  }
}

export default Block;
