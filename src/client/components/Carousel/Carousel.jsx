import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

class Carousel extends PureComponent {
    static defaultProps = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        carouselRef: null,
    };
    static propTypes = {
        children: PropTypes.any.isRequired,
        carouselRef: PropTypes.any,
    }
    static widthFix(slider) {
        setTimeout(() => slider.onWindowResized(), 0);
    }
    static nextSlide(slider) {
        slider.slickNext();
    }
    static prevSlide(slider) {
        slider.slickPrev();
    }
    render() {
        const { carouselRef, children, ...settings } = this.props;
        return (
            <Slider ref={carouselRef} {...settings}>
                {this.props.children}
            </Slider>
        );
    }
}

export default Carousel;
