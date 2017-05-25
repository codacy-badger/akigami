import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import omit from 'lodash/omit';

class Carousel extends PureComponent {
    static defaultProps = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    static propTypes = {
        children: PropTypes.any.isRequired,
    }
    render() {
        const settings = omit(this.props, 'children');
        return (
            <Slider {...settings}>
                {this.props.children}
            </Slider>
        );
    }
}

export default Carousel;
