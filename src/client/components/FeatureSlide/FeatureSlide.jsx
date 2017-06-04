import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import truncate from 'lodash/truncate';

class FeatureSlide extends PureComponent {
    static defaultProps = {
        description: null,
    }
    static propTypes = {
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        id: PropTypes.number.isRequired,
    }
    render() {
        const { image, title, description, id } = this.props;
        const titleOptions = {
            length: 32,
            separator: /,? +/,
        };
        const descOptions = {
            length: 270,
            separator: /,? +/,
        };
        return (
            <div
                className="feature-slide"
                style={{
                    backgroundImage: `
                        linear-gradient(to bottom, rgba(11,11,11,0.4) 0%,
                        rgba(11,11,11,0.9) 70%,
                        rgba(11,11,11,1) 100%),
                        url(${image})
                    `,
                }}
            >
                <div className="feature-side-inner">
                    <div className="feature-slide-content">
                        <h1>{truncate(title, titleOptions)}</h1>
                        {description && <p>{truncate(description, descOptions)}</p>}
                    </div>
                    <div className="feature-slide-buttons">
                        <Button as="a" inverted color="yellow" href={`/theater/${id}`}>Смотреть онлайн</Button>
                        <Button as="a" inverted color="red" href={`/anime/${id}`}>Узнать подробнее</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FeatureSlide;
