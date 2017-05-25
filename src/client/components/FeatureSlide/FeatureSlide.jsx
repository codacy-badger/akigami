import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
} from 'reactstrap';

class FeatureSlide extends PureComponent {
    static propTypes = {
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    }
    render() {
        const { image, title, id } = this.props;
        return (
            <div
                className="feature-slide"
                style={{
                    backgroundImage: `
                        linear-gradient(to bottom, rgba(11,11,11,0.2) 0%,
                        rgba(11,11,11,0.95) 90%,
                        rgba(11,11,11,1) 100%),
                        url(${image})
                    `,
                }}
            >
                <div className="feature-side-inner">
                    <h1>{title}</h1>
                    <div className="feature-slide-buttons">
                        <Button color="primary" href={`/theater/${id}`}>Смотреть онлайн</Button>
                        <Button color="danger" href={`/anime/${id}`}>Узнать подробнее</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FeatureSlide;
