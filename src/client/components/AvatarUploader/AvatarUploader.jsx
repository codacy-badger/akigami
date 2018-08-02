import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import { Wrapper, Replacer, Zone, Icon, Title } from './AvatarUploader.styled';

class AvatarUploader extends PureComponent {
  static propTypes = {
    size: PropTypes.number,
    avatar: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
  };
  static defaultProps = {
    size: 80,
    avatar: null,
    className: null,
    style: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.avatar,
    };
  }
  onDrop = files => {
    this.setState({ avatar: files[0] });
  };
  clearFiles = () => {
    this.setState({ avatar: null });
  };
  render() {
    const { size, className, style } = this.props;
    const { avatar } = this.state;
    if (avatar) {
      return (
        <Wrapper size={size} className={className} style={style}>
          <Replacer onClick={this.clearFiles}>Выбрать другой</Replacer>
          <Avatar size={size + 4} src={avatar.preview || avatar} />
        </Wrapper>
      );
    }
    return (
      <Wrapper size={size} className={className} style={style}>
        <Zone
          multiple={false}
          onDrop={this.onDrop}
          ref={e => {
            this.zone = e;
          }}
        >
          <Icon type="account-outline" />
          <Title>Загрузить аватар</Title>
        </Zone>
      </Wrapper>
    );
  }
}

export default AvatarUploader;
