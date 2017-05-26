import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Poster extends PureComponent {
    static defaultProps = {
        src: this.defaultImage,
    }
    static propTypes = {
        src: PropTypes.string,
        type: PropTypes.oneOf(['anime', 'manga', 'ranobe']).isRequired,
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    }
    defaultImage = '/static/no-poster.jpg';
    render() {
        const { src = this.defaultImage, type, id, title } = this.props;
        return (
            <a href={`/${type}/${id}`} className="poster-link">
                <img
                    className="poster"
                    src={src}
                    title={title}
                    alt={title}
                />
            </a>
        );
    }
}

export default Poster;
