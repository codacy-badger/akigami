import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import Avatar from '../Avatar';
import Icon from '../Icon';

class AvatarUploader extends PureComponent {
    static defaultProps = {
        size: 80,
    }
    static propTypes = {
        size: PropTypes.number,
    }
    state = {
        avatar: null,
    }
    onDrop = (files) => {
        this.setState({ avatar: files[0] });
    }
    clearFiles = () => {
        this.setState({ avatar: null });
    }
    render() {
        const { size } = this.props;
        const { avatar } = this.state;
        const styleWrapper = {
            width: size + 4,
            height: size + 4,
        };
        if (avatar) {
            return (
                <div className="avatar-uploader-wrapper" style={styleWrapper}>
                    <button
                        onClick={this.clearFiles}
                        className="avatar-uploader-replace"
                    >
                        Выбрать другой
                    </button>
                    <Avatar size={size} src={avatar.preview} />
                </div>
            );
        }
        return (
            <div className="avatar-uploader-wrapper" style={styleWrapper}>
                <Dropzone
                    multiple={false}
                    onDrop={this.onDrop}
                    className="avatar-uploader"
                    ref={(e) => {
                        this.zone = e;
                    }}
                >
                    <Icon type="account-outline" />
                    <p>Загрузить аватар</p>
                </Dropzone>
            </div>
        );
    }
}

export default AvatarUploader;
