import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class BackgroundCover extends PureComponent {
    static defaultProps = {
        src: null,
    }
    static propTypes = {
        src: PropTypes.string,
    }
    render() {
        const { src } = this.props;
        return (
            <div
                className="bg-cover"
                style={{
                    backgroundImage: `
                        linear-gradient(to bottom, rgba(11,11,11,0.4) 0%,
                        rgba(11,11,11,0.9) 70%,
                        rgba(11,11,11,1) 100%),
                        url(${src})
                    `,
                }}
            />
        );
    }
}

export default BackgroundCover;
