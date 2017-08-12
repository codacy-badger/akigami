import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import cx from 'classnames';

import Avatar from '../Avatar';
import Icon from '../Icon';

class AvatarUploader extends PureComponent {
    static defaultProps = {
        size: 80,
        avatar: null,
        className: null,
        style: {},
    }
    static propTypes = {
        size: PropTypes.number,
        avatar: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
    }
    constructor(props) {
        super(props);
        this.state = {
            avatar: props.avatar,
        };
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
        const { size, className, style } = this.props;
        const { avatar } = this.state;
        const styleWrapper = {
            width: size + 4,
            height: size + 4,
            ...style,
        };
        if (avatar) {
            return (
                <div
                    className={cx({
                        'avatar-uploader-wrapper': true,
                        [className]: className,
                    })}
                    style={styleWrapper}
                >
                    <button
                        onClick={this.clearFiles}
                        className="avatar-uploader-replace"
                    >
                        Выбрать другой
                    </button>
                    <Avatar size={size} src={avatar.preview || avatar} />
                </div>
            );
        }
        return (
            <div
                className={cx({
                    'avatar-uploader-wrapper': true,
                    [className]: className,
                })}
                style={styleWrapper}
            >
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
