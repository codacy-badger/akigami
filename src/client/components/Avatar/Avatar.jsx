import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image } from './Avatar.styled';

class Avatar extends PureComponent {
    static defaultProps = {
        src: '',
        size: 40,
        className: '',
    }
    static propTypes = {
        src: PropTypes.string,
        size: PropTypes.number,
        className: PropTypes.string,
    }

    render() {
        const { src, size, className } = this.props;
        return (
            <Image
                size={size}
                src={src}
                className={className}
            />
        );
    }
}

export default Avatar;
